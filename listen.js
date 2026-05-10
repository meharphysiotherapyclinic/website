/* =========================================================
   LISTEN TO ARTICLE
   - Reads AI summary + headings + paragraphs + lists
   - Auto-scroll
   - Highlight current section
   - Stop support
   - Mobile voice compatibility
   - Screen Wake Lock
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const article =
    document.getElementById("blog-content");

  if (!article) return;

  /* =========================================
     CONTENT TO READ
  ========================================= */

  const sections =
    article.querySelectorAll(
      ".ai-summary-box, h1, h2, h3, p, li"
    );

  /* =========================================
     BUTTONS
  ========================================= */

  const listenBtn =
    document.getElementById("listenBtn");

  const stopBtn =
    document.getElementById("stopBtn");

  /* =========================================
     STATE
  ========================================= */

  let currentIndex = 0;

  let isStopped = false;

  /* =========================================
     WAKE LOCK
  ========================================= */

  let wakeLock = null;

  async function enableWakeLock() {

    try {

      if ("wakeLock" in navigator) {

        wakeLock =
          await navigator.wakeLock.request(
            "screen"
          );

        console.log(
          "Wake Lock active"
        );

        wakeLock.addEventListener(
          "release",
          () => {

            console.log(
              "Wake Lock released"
            );

          }
        );

      } else {

        console.log(
          "Wake Lock unsupported"
        );

      }

    } catch (err) {

      console.log(
        `Wake Lock Error:
         ${err.name},
         ${err.message}`
      );

    }

  }

  async function disableWakeLock() {

    try {

      if (wakeLock !== null) {

        await wakeLock.release();

        wakeLock = null;

      }

    } catch (err) {

      console.log(err);

    }

  }

  /* =========================================
     RE-ENABLE WHEN TAB RETURNS
  ========================================= */

  document.addEventListener(
    "visibilitychange",
    async () => {

      if (
        wakeLock !== null &&
        document.visibilityState ===
          "visible"
      ) {

        try {

          wakeLock =
            await navigator.wakeLock.request(
              "screen"
            );

        } catch (err) {

          console.log(err);

        }

      }

    }
  );

  /* =========================================
     VOICES
  ========================================= */

  let voices = [];

  /* =========================================
     CLEAR HIGHLIGHT
  ========================================= */

  function clearHighlight() {

    sections.forEach(el => {

      el.classList.remove("speaking");

    });

  }

  /* =========================================
     HIGHLIGHT CURRENT SECTION
  ========================================= */

  function highlightSection(index) {

    clearHighlight();

    const el = sections[index];

    if (!el) return;

    el.classList.add("speaking");

    el.scrollIntoView({

      behavior: "smooth",

      block: "center"

    });

  }

  /* =========================================
     SPEAK SECTION
  ========================================= */

  function speakSection(index) {

    /* ARTICLE COMPLETE */

    if (
      index >= sections.length ||
      isStopped
    ) {

      clearHighlight();

      disableWakeLock();

      return;

    }

    let text =
      sections[index].innerText.trim();

    /* =========================================
       FIX "Dr." PRONUNCIATION
    ========================================= */

    text = text
      .replace(/\bDr\./g, "Doctor")
      .replace(/\bDr\b/g, "Doctor");

    /* =========================================
       SKIP EMPTY
    ========================================= */

    if (!text) {

      currentIndex++;

      speakSection(currentIndex);

      return;

    }

    highlightSection(index);

    const utterance =
      new SpeechSynthesisUtterance(text);

    /* =========================================
       VOICE SETTINGS
    ========================================= */

    utterance.lang = "en-US";

    utterance.rate = 0.95;

    utterance.pitch = 1;

    const preferredVoice =
      voices.find(v =>
        v.lang.includes("en")
      );

    if (preferredVoice) {

      utterance.voice =
        preferredVoice;

    }

    /* =========================================
       NEXT SECTION
    ========================================= */

    utterance.onend = () => {

      if (!isStopped) {

        currentIndex++;

        speakSection(currentIndex);

      }

    };

    /* =========================================
       ERROR HANDLING
    ========================================= */

    utterance.onerror = (event) => {

      console.log(
        "Speech Error:",
        event.error
      );

      disableWakeLock();

      clearHighlight();

    };

    window.speechSynthesis.speak(
      utterance
    );

  }

  /* =========================================
     LISTEN BUTTON
  ========================================= */

  listenBtn.addEventListener(
    "click",
    async () => {

      await enableWakeLock();

      window.speechSynthesis.cancel();

      isStopped = false;

      currentIndex = 0;

      /* =========================================
         ENSURE VOICES LOAD
      ========================================= */

      voices =
        window.speechSynthesis.getVoices();

      if (!voices.length) {

        window.speechSynthesis.onvoiceschanged =
          () => {

            voices =
              window.speechSynthesis.getVoices();

            speakSection(currentIndex);

          };

      } else {

        speakSection(currentIndex);

      }

    }
  );

  /* =========================================
     STOP BUTTON
  ========================================= */

  stopBtn.addEventListener(
    "click",
    async () => {

      isStopped = true;

      window.speechSynthesis.cancel();

      await disableWakeLock();

      clearHighlight();

    }
  );

});
