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

  const track = document.getElementById('review-track');
  const carousel = document.querySelector('.review-carousel');
  
  if (track && carousel) {
    const fullList = [...websiteReviews, ...websiteReviews];
    
    fullList.forEach(rev => {
      const card = document.createElement('div');
      card.className = 'review-card';
      card.innerHTML = `
        <div class="review-stars">★★★★★</div>
        <p class="review-text">"${rev.text}"</p>
        <div class="review-author">
          <strong>${rev.name}</strong>
          <span>${rev.service}</span>
        </div>
      `;
      track.appendChild(card);
    });

    carousel.addEventListener('touchstart', () => carousel.classList.add('paused'), { passive: true });
    carousel.addEventListener('touchend', () => {
      setTimeout(() => carousel.classList.remove('paused'), 50);
    }, { passive: true });
    carousel.addEventListener('touchcancel', () => carousel.classList.remove('paused'), { passive: true });
  }
});
function shareWebsite() {
  if (navigator.share) {
    navigator.share({
      title: 'Mehar Physiotherapy Clinic',
      text: 'Check out Mehar Physiotherapy Clinic in Gaur City 2 for expert physiotherapy and rehabilitation.',
      url: window.location.href
    })
    .catch((error) => console.log('Error sharing:', error));
  } else {
    // Fallback: Copy link to clipboard if sharing is not supported (like on some desktops)
    navigator.clipboard.writeText(window.location.href);
    alert("Website link copied to clipboard!");
  }
}
