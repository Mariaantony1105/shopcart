let listCards = [];
let product = document.querySelector(".product");
let quantity = document.querySelector(".quantity");
let total = document.querySelector(".total");
let listCard = document.querySelector(".listcard");
let datas = [];
var i = 0;
let loginData = [];

// Function to load user's cart data from localStorage
function loadUserCartData() {
  const userData = JSON.parse(localStorage.getItem("loginData"));
  if (userData && userData.cartData) {
    listCards = userData.cartData;
    console.log(userData.cartData);
    reloadCard();
  }
}

// Function to save cart data to localStorage
function saveCartDataToLocalStorage() {
  const userData = JSON.parse(localStorage.getItem("loginData"));
  if (userData) {
    userData.cartData = listCards;
    localStorage.setItem("loginData", JSON.stringify(userData));
  }
}

fetch("shopcart.json")
  .then((response) => response.json())
  .then((data) => {
    datas = data;
    display(); // Call the display function here to show all products initially
  });

// Add the input event listener to the search input element
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", display);

function display() {
  // Clear the existing product container before displaying the products
  product.innerHTML = "";

  const searchQuery = searchInput.value.toLowerCase().trim();
  datas.forEach((element) => {
    if (element.id.toLowerCase().includes(searchQuery)) {
      let div = document.createElement("div");
      div.innerHTML = `
        <div class="product_card card border-0" style="" data-key=${i++} data-set=${
        element.set
      }>
          <img src="${element.image}" class="card-img-top " alt="">
          <div class="card-body text-center">
            <h5 class="card-title">${element.id}</h5>
            <p class="card-text">$${element.price.toLocaleString()}</p>
            <button class="btn add w-100 border-0">addtocart</button>
          </div>
        </div>
      `;
      product.appendChild(div);
    }
  });

  // Add event listeners to the "Add to Cart" buttons after displaying the products
  let addToCart = document.querySelectorAll(".add");
  addToCart.forEach((btn, key) => {
    btn.addEventListener("click", () => addtoCart(key));
  });
}

// Rest of your addtoCart, reloadCard, changeQuantity, and deleteItem functions remain the same
function addtoCart(key) {
  if (listCards[key] == null) {
    listCards[key] = { ...datas[key], quantity: 1 };
  } else {
    listCards[key].quantity = 1;
    listCards[key].price = listCards[key].quantity * datas[key].price;
  }
  reloadCard();
  saveCartDataToLocalStorage(); // Save the updated cart data to localStorage
}

function reloadCard() {
  listCard.innerHTML = "";
  let count = 0;
  let totalPrice = 0;
  listCards.forEach((value, key) => {
    totalPrice += value.price * 1;
    count += value.quantity;
    if (value != null) {
      let newDiv = document.createElement("li");
      newDiv.innerHTML = `
      <div class="cart_card d-flex">
          <div><img src="${value.image}" width="30divx"/></div>
          <div>${value.id}</div>
          <div>$${value.price.toLocaleString()}</div>
          <div>
            <button class="btn changequantity"  onclick="changeQuantity(${key}, ${
        value.quantity - 1
      })"><p>-</p></button>
            <div class="count">${value.quantity}</div>
            <button class="btn changequantity" onclick="changeQuantity(${key}, ${
        value.quantity + 1
      })"><p>+</p></button>
          </div>
          <button class="btn btn-primary" onclick="deleteItem(${key})">delete</button>
          </div>`;
      listCard.appendChild(newDiv);
    }
  });
  total.innerText = ` total price $ ${totalPrice.toLocaleString()}`;
  quantity.innerText = count;
  console.log(totalPrice, quantity, count);
}

function changeQuantity(key, quantity) {
  if (quantity == 0) {
    // delete listCards[key];
  } else {
    listCards[key].quantity = quantity;
    listCards[key].price = quantity * datas[key].price;
  }
  reloadCard();
  saveCartDataToLocalStorage(); // Save the updated cart data to localStorage
}

function deleteItem(key) {
  listCards.splice(key, 1);
  reloadCard();
  saveCartDataToLocalStorage(); // Save the updated cart data to localStorage
}

//select item
let starters = document.getElementById("starters");
starters.addEventListener("click", side);

function side() {
  const selectedSet = 10; // Replace this with the actual value of the selected set

  // Filter the products that match the selected set
  const selectedProducts = datas.filter(
    (element) => element.set == selectedSet
  );

  // Display the selected products if found
  if (selectedProducts.length > 0) {
    product.innerHTML = "";

    // Create product cards for each matching product
    selectedProducts.forEach((selectedProduct) => {
      let div = document.createElement("div");
      div.innerHTML = `
        <div class="product_card card border-0" style="width: 18rem;" data-key=${i++} data-set=${
        selectedProduct.set
      }>
          <img src="${selectedProduct.image}" class="card-img-top" alt="">
          <div class="card-body text-center">
            <h5 class="card-title">${selectedProduct.id}</h5>
            <p class="card-text">$${selectedProduct.price.toLocaleString()}</p>
            <button class="btn add w-100 border-0">addtocart</button>
          </div>
        </div>
      `;
      product.appendChild(div);
    });
  } else {
    // Display a message or any fallback content if no product is found
    product.innerHTML = "<p>No matching products found.</p>";
  }

  // Add event listeners to the "Add to Cart" buttons after displaying the products
  let addToCart = document.querySelectorAll(".add");
  addToCart.forEach((btn, key) => {
    btn.addEventListener("click", () => addtoCart(key));
  });
}

//sidebar
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("side").style.marginLeft = "250px";
  document.getElementById("side").style.opacity = "0.2";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("side").style.marginLeft = "0";
  document.getElementById("side").style.opacity = "1";
}

function displaysignUpSymbol() {
  let symbol = document.querySelector(".fa-right-to-bracket");
  if (symbol) {
    symbol.style.display = "none";
    console.log("didit");
  }
}

//signup
function signup() {
  event.preventDefault();

  var email = document.getElementById("femail").value;
  var username = document.getElementById("fname").value;
  var pass = document.getElementById("fpassword").value;
  user = {
    email: email,
    username: username,
    password: pass,
    cartData: [], // Initialize an empty cart for the new user
  };
  var json = JSON.stringify(user);
  localStorage.setItem(username, json);
  console.log("user added");
}

//signin
function loginFunc() {
  event.preventDefault();

  var email = document.getElementById("femail").value;
  var username = document.getElementById("fname").value;
  var pass = document.getElementById("fpassword").value;
  var register = document.getElementById("register");
  var user = localStorage.getItem(username);
  var data = JSON.parse(user);

  if (user == null) {
    result.innerHTML = "Enter a Valid Email";
  } else if (username == data.username && pass == data.password) {
    result.innerHTML = "User password correct";
    localStorage.setItem("loginData", JSON.stringify(data));
    // Display the username on the webpage
    document.getElementById("loggedInUserName").innerText = data.username;
    // Load the user's cart data from localStorage
    listCards = data.cartData || [];
    reloadCard();
    document.addEventListener("DOMContentLoaded", function () {
      // This code will be executed after the DOM is fully loaded
      displaysignUpSymbol();
    });
  } else {
    result.innerHTML =
      "Password Wrong. Seat Back, Relax And Think 🤔🤔🤔🤔🤔💭💭 ";
    register.style.visibility = "visible";
  }
}

// User name print
const userData = JSON.parse(localStorage.getItem("loginData"));
loginData.push(userData);
let usernameInMainPage = document.querySelector(".username");
usernameInMainPage.innerHTML = `${loginData[0]?.username || "Guest"}`;

let LogOuts = document.querySelector(".LogOut");
LogOuts.addEventListener("click", LogOut);
function LogOut() {
  // Clear the loginData from localStorage
  localStorage.removeItem("loginData");
  // Reload the page to remove the username from the main page
  window.location.reload();
}

// Load user's cart data when the page loads
loadUserCartData();
