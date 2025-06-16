let totalAmount = 0; // Variable to hold the total amount
let originalWatchCards = []; // Array to store the original state of the watch cards
let lastSelectedOption = ""; // Variable to track the last selected option

document.addEventListener("DOMContentLoaded", () => {
  // Store the original state of the watch cards when the page loads
  originalWatchCards = Array.from(document.querySelectorAll(".watch-card"));
});

function filterProducts() {
  const searchQuery = document.getElementById("searchBar").value.toLowerCase();
  const watchCards = originalWatchCards; // Use the original state for filtering

  // Loop through each watch card and check if it matches the search query
  watchCards.forEach((card) => {
    const productName = card.querySelector("h2").textContent.toLowerCase();
    card.style.display = productName.includes(searchQuery) ? "block" : "none";
  });

  // Update the UI by re-appending the filtered watch cards
  const container = document.querySelector(".container");
  container.innerHTML = "";
  watchCards.forEach((card) => container.appendChild(card));
}

function sortProducts() {
  const sortOrder = document.getElementById("sortOrder").value;
  const watchCards = originalWatchCards; // Use the original state for sorting
  const container = document.querySelector(".container");

  if (sortOrder === lastSelectedOption) {
    // If the same sorting option is selected again, reset the filters
    resetFilters();
    lastSelectedOption = ""; // Reset the last selected option
    return;
  }

  lastSelectedOption = sortOrder; // Update the last selected option

  let sortedCards;
  if (sortOrder === "all" || sortOrder === "") {
    sortedCards = watchCards; // Show all cards
  } else if (sortOrder === "1000-5000") {
    // Filter watches with a price of up to Rs.5000
    sortedCards = watchCards.filter(
      (card) =>
        parseFloat(
          card.querySelector(".price").textContent.replace("RS.", "")
        ) <= 5000
    );
  } else if (sortOrder === "5000-10000") {
    // Filter watches between Rs.5000 and Rs.10,000
    sortedCards = watchCards.filter((card) => {
      const price = parseFloat(
        card.querySelector(".price").textContent.replace("RS.", "")
      );
      return price > 5000 && price <= 10000;
    });
  } else if (sortOrder === "10000+") {
    // Filter watches above Rs.10,000
    sortedCards = watchCards.filter(
      (card) =>
        parseFloat(
          card.querySelector(".price").textContent.replace("RS.", "")
        ) > 10000
    );
  }

  // Check if any products match the filter criteria
  if (sortedCards.length === 0) {
    container.innerHTML = "<p>No products found in this category.</p>";
  } else {
    container.innerHTML = ""; // Clear the container
    sortedCards.forEach((card) => container.appendChild(card));
  }
}

function resetFilters() {
  // Reset the product listing to show all original watch cards
  const container = document.querySelector(".container");
  container.innerHTML = ""; // Clear the container
  originalWatchCards.forEach((card) => container.appendChild(card));
  document.getElementById("sortOrder").value = ""; // Reset the dropdown value
  lastSelectedOption = ""; // Reset the last selected option
}

// Function to handle adding a product to the cart
function purchaseWatch(name, price, button) {
  const purchaseList = document.getElementById("purchase-list");
  let existingItem = Array.from(purchaseList.children).find(
    (item) => item.getAttribute("data-name") === name
  );

  if (existingItem) {
    // If item already exists, increase quantity
    adjustQuantity(existingItem, 1);
  } else {
    // Create a new item in the purchase list
    const listItem = document.createElement("li");
    listItem.setAttribute("data-price", price); // Store price
    listItem.setAttribute("data-name", name); // Store product name
    listItem.innerHTML = `
            ${name} - Rs.${price.toFixed(2)} x 
            <button class="decrease-qty">–</button>
            <span class="quantity">1</span>
            <button class="increase-qty">+</button>
            <button class="cancel-btn">Cancel</button>
        `;

    purchaseList.appendChild(listItem);

    // Add event listeners for quantity adjustment and removal
    listItem
      .querySelector(".decrease-qty")
      .addEventListener("click", () => adjustQuantity(listItem, -1));
    listItem
      .querySelector(".increase-qty")
      .addEventListener("click", () => adjustQuantity(listItem, 1));
    listItem
      .querySelector(".cancel-btn")
      .addEventListener("click", () => cancelPurchase(listItem, button));
  }

  totalAmount += price; // Update the total amount
  updateTotal();

  button.textContent = "Added"; // Change button text
  button.disabled = true; // Disable button to prevent multiple clicks
}

// Function to adjust the quantity of an item in the cart
function adjustQuantity(item, change) {
  const quantitySpan = item.querySelector(".quantity");
  let quantity = parseInt(quantitySpan.textContent) + change;
  const itemPrice = parseFloat(item.getAttribute("data-price"));

  if (quantity <= 0) {
    // If quantity becomes zero, remove the item from the cart
    cancelPurchase(item, null);
  } else {
    quantitySpan.textContent = quantity;
    totalAmount += itemPrice * change; // Update total amount
    updateTotal();
  }
}

// Function to remove an item from the cart
function cancelPurchase(item, button) {
  const quantity = parseInt(item.querySelector(".quantity").textContent);
  const itemPrice = parseFloat(item.getAttribute("data-price")) * quantity;
  const productName = item.getAttribute("data-name");

  item.remove(); // Remove item from the purchase list
  totalAmount -= itemPrice; // Update total amount
  updateTotal();

  // Reset the "Add to Cart" button if available
  if (button) {
    button.textContent = "Add to Cart";
    button.disabled = false;
  } else {
    // If button reference is not available, find and reset the button manually
    const productCards = document.querySelectorAll(".watch-card");
    productCards.forEach((card) => {
      const cardName = card.querySelector("h2").textContent;
      if (cardName === productName) {
        const addButton = card.querySelector("button");
        addButton.textContent = "Add to Cart";
        addButton.disabled = false;
      }
    });
  }
}

// Function to update the total amount and apply discounts if applicable
function updateTotal() {
  const purchaseList = document.getElementById("purchase-list");
  let discountedAmount = totalAmount;
  let discountMessage = "";

  // Calculate total number of items in the cart
  let itemCount = 0;
  Array.from(purchaseList.children).forEach((item) => {
    itemCount += parseInt(item.querySelector(".quantity").textContent);
  });

  // Apply a 20% discount if 2 or more items are purchased
  if (itemCount >= 2) {
    discountedAmount *= 0.8;
    discountMessage = `You saved 20%! Original Total: Rs.${totalAmount.toFixed(
      2
    )}, Discounted Total: Rs.${discountedAmount.toFixed(2)}`;
  } else {
    discountMessage = `Total: Rs.${discountedAmount.toFixed(2)}`;
  }

  document.getElementById(
    "total-amount"
  ).textContent = `Total: Rs.${discountedAmount.toFixed(2)}`;
  document.getElementById("discount-message").textContent = discountMessage;
}

// Function to display the payment section
function showPayment() {
  document.getElementById("payment-section").style.display = "block";
}

// Function to handle payment processing
function processPayment() {
  const name = document.getElementById("name").value;
  const location = document.getElementById("location").value;
  const contact = document.getElementById("contact").value;
  if (name && location && contact) {
    document.getElementById("paymentModal").style.display = "flex";
  } else {
    alert("Please fill in all required details.");
  }
}

// Function to close the payment modal
function closeModal() {
  document.getElementById("paymentModal").style.display = "none";
}
