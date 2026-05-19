/* =========================================================
   LISTEN TO ARTICLE - FULL FIXED VERSION
   Fixes:
   - iOS gesture context (synchronous speak call)
   - iOS silent pause bug (resume hack)
   - iOS voice selection (localService)
   - iOS onerror interrupted/canceled ignored
   - NoSleep.js for screen wake on iOS
   - Wake lock retained for Android/desktop
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const article = document.getElementById("blog-content");
  if (!article) return;

  const sections = article.querySelectorAll(".ai-summary-box, h1, h2, h3, p, li");
  const filteredSections = Array.from(sections).filter(el => {
    return !(el.tagName.toLowerCase() === "p" && el.closest(".ai-summary-box"));
  });

  const listenBtn = document.getElementById("listenBtn");
  const stopBtn = document.getElementById("stopBtn");

  let currentIndex = 0;
  let isStopped = false;
  let wakeLock = null;
  let voices = [];
  let iosResumeInterval = null;
  const noSleep = new NoSleep(); // NoSleep instance

  /* =========================================
     DETECT iOS
  ========================================= */
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  /* =========================================
     PRE-LOAD VOICES
  ========================================= */
  function loadVoices() {
    voices = window.speechSynthesis.getVoices();
  }

  loadVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }

  /* =========================================
     WAKE LOCK (Android & Desktop)
  ========================================= */
  async function enableWakeLock() {
    try {
      if ("wakeLock" in navigator) {
        wakeLock = await navigator.wakeLock.request("screen");
      }
    } catch (err) {
      console.log(`Wake Lock Error: ${err.message}`);
    }
  }

  async function disableWakeLock() {
    if (wakeLock !== null) {
      await wakeLock.release();
      wakeLock = null;
    }
  }

  /* =========================================
     iOS RESUME HACK
     Safari silently pauses speech after ~10-15s.
     pause() + resume() every 10s keeps it alive.
  ========================================= */
  function startIosResumeHack() {
    if (!isIOS) return;
    stopIosResumeHack();
    iosResumeInterval = setInterval(() => {
      if (isStopped || !window.speechSynthesis.speaking) return;
      window.speechSynthesis.pause();
      window.speechSynthesis.resume();
    }, 10000);
  }

  function stopIosResumeHack() {
    if (iosResumeInterval) {
      clearInterval(iosResumeInterval);
      iosResumeInterval = null;
    }
  }

  /* =========================================
     CLEANUP — called on stop & article end
  ========================================= */
  function fullStop() {
    stopIosResumeHack();
    disableWakeLock();
    noSleep.disable();
    clearHighlight();
  }

  /* =========================================
     HIGHLIGHT LOGIC
  ========================================= */
  function clearHighlight() {
    filteredSections.forEach(el => el.classList.remove("speaking"));
  }

  function highlightSection(index) {
    clearHighlight();
    const el = filteredSections[index];
    if (!el) return;
    el.classList.add("speaking");
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  /* =========================================
     SPEAK LOGIC
  ========================================= */
  function speakSection(index) {
    // Article finished or manually stopped
    if (index >= filteredSections.length || isStopped) {
      fullStop();
      return;
    }

    let text = filteredSections[index].innerText.trim();

    /* ---- FIX PRONUNCIATION ---- */
    text = text
      .replace(/\bDr\./g, "Doctor")
      .replace(/\bDr\b/g, "Doctor")
      .replace(/\bM\.I\.A\.P\.\b/g, "Member of Indian Association of Physiotherapists")
      .replace(/\bB\.P\.T\.\b/g, "Bachelor of Physiotherapy")
      .replace(/\bMehar\b/gi, "meher");

    // Skip empty sections
    if (!text) {
      currentIndex++;
      speakSection(currentIndex);
      return;
    }

    highlightSection(index);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.95;

    // iOS: prefer local built-in English voice
    // Android/Desktop: prefer Google voice
    if (isIOS) {
      const iosVoice = voices.find(v => v.lang.startsWith("en") && v.localService);
      if (iosVoice) utterance.voice = iosVoice;
    } else {
      const preferredVoice = voices.find(v => v.name.includes("Google")) ||
                             voices.find(v => v.lang.includes("en"));
      if (preferredVoice) utterance.voice = preferredVoice;
    }

    utterance.onend = () => {
      if (!isStopped) {
        currentIndex++;
        speakSection(currentIndex);
      }
    };

    utterance.onerror = (e) => {
      // iOS fires 'interrupted'/'canceled' on cancel() — expected, safe to ignore
      if (e.error === "interrupted" || e.error === "canceled") return;
      console.warn("Speech error:", e.error);
      fullStop();
    };

    window.speechSynthesis.speak(utterance);
  }

  /* =========================================
     LISTEN BUTTON
     speak() MUST be called synchronously inside
     the click handler on iOS — no await before it.
  ========================================= */
  listenBtn.addEventListener("click", () => {
    window.speechSynthesis.cancel();
    isStopped = false;
    currentIndex = 0;

    enableWakeLock();   // fire-and-forget — works on Android/Desktop
    noSleep.enable();   // works on iOS (silent video loop)
    startIosResumeHack();

    // Synchronous call — preserves iOS gesture context
    speakSection(currentIndex);
  });

  /* =========================================
     STOP BUTTON
  ========================================= */
  stopBtn.addEventListener("click", () => {
    isStopped = true;
    window.speechSynthesis.cancel();
    fullStop();
  });

});
