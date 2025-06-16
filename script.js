let index = 0;
const slides = document.querySelectorAll(".carousel-item");
const totalSlides = slides.length;
const inner = document.getElementById("carousel-inner");

function showSlide() {
  inner.style.transform = `translateX(-${index * 100}%)`;
}

function autoSlide() {
  index = (index + 1) % totalSlides;
  showSlide();
}

setInterval(autoSlide, 3000); // Change slide every 3 seconds

// <-----Newsletter---->
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".newsletter form");
  const emailInput = form.querySelector('input[type="email"]');

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission

    const email = emailInput.value.trim();

    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(email)) {
      // Simulate a successful subscription
      alert(`Thank you for subscribing with ${email}!`);
      emailInput.value = ""; // Clear the input
    } else {
      alert("Please enter a valid email address.");
    }
  });
});
