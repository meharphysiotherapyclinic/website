document.addEventListener('DOMContentLoaded', () => {

  const websiteReviews = [
    {
      name: "Debangshi Chaterjee",
      text: "Dr. Govind Ji is extraordinary. He treated my mother-in-law for knee replacement. She started walking without support in 25 days.",
      service: "Knee Replacement Rehab"
    },
    {
      name: "Ankit Kumar Nayak",
      text: "Highly recommended for honest recommendations and effective treatment. Experienced doctor and high-end equipment.",
      service: "Post-Accident Recovery"
    },
    {
      name: "Mridula Tyagi",
      text: "Massive thanks to Dr. Arneja. After my slip disc, I didn't think I could live a normal life without surgery.",
      service: "Slip Disc Treatment"
    },
    {
      name: "Nirupa Chaurasia",
      text: "After knee replacement, I am finally happy with my leg movement thanks to Govind ji.",
      service: "Knee Rehab"
    }
  ];

  const wrapper = document.getElementById('review-wrapper');
  if (!wrapper) return;

  // Clear first (prevents duplication bugs)
  wrapper.innerHTML = '';

  // Create slides
  websiteReviews.forEach(rev => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';

    slide.innerHTML = `
      <div class="review-card">
        <div class="review-stars">★★★★★</div>
        <div class="review-text">"${rev.text}"</div>
        <div class="review-author">
          <strong>${rev.name}</strong>
          <span>${rev.service}</span>
        </div>
      </div>
    `;

    wrapper.appendChild(slide);
  });

  // ✅ Ensure Swiper exists before initializing
  if (typeof Swiper === 'undefined') {
    console.error('Swiper not loaded');
    return;
  }

  // ✅ Professional smooth autoplay
  new Swiper('.review-swiper', {
    slidesPerView: 'auto',
    spaceBetween: 15,
    loop: true,

    speed: 3000, // smooth continuous feel

    autoplay: {
      delay: 1,                // 🔥 continuous motion trick
      disableOnInteraction: false,
    },

    freeMode: true,
    freeModeMomentum: false,

    grabCursor: true,

    breakpoints: {
      0: { spaceBetween: 10 },
      768: { spaceBetween: 15 }
    }
  });

});
