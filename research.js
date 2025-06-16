// Array containing data for each brand
const brands = [
  {
    name: "Samaya Watch",
    data: [
      "Their drab design makes the website look elegant and eye-catching.",
      "Everything is organized around a user-friendly interface with accessible buttons and a nicely structured layout. Although the search bar placement is a bit unusual, the rest is overall good.",
      "The user experience is seamless and engaging. It allows easy product browsing and a smooth checkout process.",
      "Samaya utilizes battery-powered quartz crystals for accurate timekeeping, combined with high-quality materials and waterproof technology in their traditional designs and many more.",
      "The navigation system is excellent with a clear main menu, easy product navigation, and great sorting and filtering options.",
      "The website offers a variety of features such as high-quality videos and images, an FAQ section, multiple payment options, and a flexible design that ensures a smooth experience across all devices.",
    ],
  },
  {
    name: "Titan",
    data: [
      "Their best design makes the site seem extravagant and attractive.",
      "Everything is neatly organized around with user-friendly interface.",
      "Their different features help to create a smooth and attractive user experience. Products can be easily browsed, and the checkout process is smooth.",
      "Titan has energy-efficient quartz timepieces as well as robot vision systems, custom-made feeders, and servo-driven actuators.",
      "The navigation system is amazing with a simple header menu, simple item navigation, and item sorting with materials like plastic and silicone.",
      "They have features and functionality such as high-quality videos and images, an FAQ section, multiple payment options, and a track order function. Its responsive design also ensures a seamless experience on all devices.",
    ],
  },
  {
    name: "Timex",
    data: [
      "Timex's vibrant design makes the website attractive and visually appealing.",
      "The user interface is very user-friendly, well-organized, and fits everything perfectly.",
      "The user experience is seamless and engaging, making product browsing and checkout processes smooth.",
      "Timex uses either mechanical movements or quartz battery movements, with a diverse range of options including quartz analog, digital, solar quartz, automatic, and manual-wind mechanicals.",
      "The navigation system is top-notch with sorting options, search functionalities, best-seller sections, and more.",
      "The website have different features and functionalities such as high-quality videos and images, an FAQ section, multiple payment options, and a notification feature. The responsive design ensures a smooth experience.",
    ],
  },
];

let currentIndex = 0; // Variable to track the current brand being displayed

// Get references to DOM elements
const brandNameElement = document.getElementById("brandName");
const tableBodyElement = document.getElementById("tableBody");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

// Function to update the table with the brand data based on the given index
function updateTable(index) {
  brandNameElement.textContent = brands[index].name; // Update the brand name
  const rows = tableBodyElement.rows; // Get the table rows

  // Update each row with the corresponding brand data
  for (let i = 0; i < rows.length; i++) {
    rows[i].cells[1].textContent = brands[index].data[i];
  }
}

// Event listener for the previous button to show the previous brand's data
prevButton.addEventListener("click", () => {
  currentIndex = currentIndex === 0 ? brands.length - 1 : currentIndex - 1;
  updateTable(currentIndex);
});

// Event listener for the next button to show the next brand's data
nextButton.addEventListener("click", () => {
  currentIndex = currentIndex === brands.length - 1 ? 0 : currentIndex + 1;
  updateTable(currentIndex);
});

// Initialize the table with the first brand's data
updateTable(currentIndex);

// Lightbox functionality
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const lightboxTriggers = document.querySelectorAll(".lightbox-trigger");

// Event listeners for the lightbox triggers to open the lightbox with the clicked image
lightboxTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    lightbox.style.display = "block";
    lightboxImg.src = trigger.src;
  });
});

// Event listener for the close button to close the lightbox
closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

// Event listener for clicking outside the lightbox to close it
window.addEventListener("click", (event) => {
  if (event.target == lightbox) {
    lightbox.style.display = "none";
  }
});
