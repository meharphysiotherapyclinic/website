/* =========================================================
   LISTEN TO ARTICLE - UPDATED FOR INSTANT START
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

  /* =========================================
     PRE-LOAD VOICES (The Fix)
  ========================================= */
  function loadVoices() {
    voices = window.speechSynthesis.getVoices();
  }

  // Initial call
  loadVoices();

  // Chrome and other browsers trigger this when voices are ready
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }

  /* =========================================
     WAKE LOCK FUNCTIONS
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
     HIGHLIGHT & SPEECH LOGIC
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

  function speakSection(index) {
    if (index >= filteredSections.length || isStopped) {
      clearHighlight();
      disableWakeLock();
      return;
    }

    let text = filteredSections[index].innerText.trim();

    // Pronunciation fixes
    text = text
      .replace(/\bDr\./g, "Doctor")
      .replace(/\bDr\b/g, "Doctor")
      .replace(/\bM\.I\.A\.P\.\b/g, "Member of Indian Association of Physiotherapists")
      .replace(/\bB\.P\.T\.\b/g, "Bachelor of Physiotherapy");
      .replace(/\bMehar\b/gi, "meher");

    if (!text) {
      currentIndex++;
      speakSection(currentIndex);
      return;
    }

    highlightSection(index);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.95;

    // Use pre-loaded voices
    const preferredVoice = voices.find(v => v.name.includes("Google")) || voices.find(v => v.lang.includes("en"));
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onend = () => {
      if (!isStopped) {
        currentIndex++;
        speakSection(currentIndex);
      }
    };

    utterance.onerror = () => {
      disableWakeLock();
      clearHighlight();
    };

    window.speechSynthesis.speak(utterance);
  }

  /* =========================================
     LISTEN BUTTON (Simplified)
  ========================================= */
  listenBtn.addEventListener("click", async () => {
    // Cancel any current speech
    window.speechSynthesis.cancel();
    isStopped = true;

    // Small delay to ensure the cancel command is processed by the hardware
    await new Promise(resolve => setTimeout(resolve, 100));

    await enableWakeLock();
    isStopped = false;
    currentIndex = 0;

    // Start immediately because voices are already loaded
    speakSection(currentIndex);
  });

  /* =========================================
     STOP BUTTON
  ========================================= */
  stopBtn.addEventListener("click", async () => {
    isStopped = true;
    window.speechSynthesis.cancel();
    await disableWakeLock();
    clearHighlight();
  });
});
