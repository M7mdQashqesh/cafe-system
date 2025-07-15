import { firestore } from "./firebase.js";
import {
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

let cart = document.querySelector(".fa-cart-shopping");
cart.addEventListener("click", function () {
  window.location.href = "../pages/cart.html";
});

let loginBtn = document.getElementById("login-btn");
let dashboardBtn = document.getElementById("dashboard-btn");

if (JSON.parse(window.localStorage.getItem("user"))) {
  loginBtn.remove();
  dashboardBtn.addEventListener("click", function () {
    window.location.href = "../pages/dashboard/uploadProduct.html";
  });
} else {
  dashboardBtn.remove();
  loginBtn.addEventListener("click", function () {
    window.location.href = "../pages/login.html";
  });
}

/* 
  // Get Data From JSON Files
  async function getData(link, place) {
    let productsArea = document.querySelector(`.varieties .${place} .products`);

    let allData = await fetch(link);
    allData = await allData.json();

    // Create Products Card
    for (let i = 0; i < allData.length; i++) {
      let productDiv = document.createElement("div");
      productDiv.className = "product";

      let imageContainer = document.createElement("div");
      imageContainer.className = "bg-image";
      imageContainer.style.cssText = `background-image: url(${allData[i].src});`;
      productDiv.appendChild(imageContainer);

      let productName = document.createElement("p");
      productName.className = "product-name";
      productName.textContent = allData[i].name;
      productDiv.appendChild(productName);

      let description = document.createElement("p");
      description.className = "description";
      description.textContent = allData[i].description;
      productDiv.appendChild(description);

      let productPrice = document.createElement("p");
      productPrice.className = "product-price";
      productPrice.textContent = `${allData[i].price} ₪`;
      productDiv.appendChild(productPrice);

      // Save selected product details in localStorage and redirect to the product details page
      productDiv.addEventListener("click", function () {
        let pDetails = {
          src: allData[i].src,
          name: allData[i].name,
          description: allData[i].description,
          price: allData[i].price,
        };
        window.localStorage.setItem("productDetails", JSON.stringify(pDetails));
        window.location.href = "../pages/productDetails.html";
      });

      productsArea.appendChild(productDiv);
    }
  }
  getData("../jsons/drinks.json", "drinks");
  getData("../jsons/sweets.json", "sweets");
*/

async function getCategories() {
  try {
    let useRef = collection(firestore, "categories");
    let querySnapshot = await getDocs(useRef);
    querySnapshot.forEach((doc) => {
      createCategoriesList(doc.data());
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
  }

  // Change Active Category
  let listOfCategories = document.querySelectorAll("#categoryList li");
  Array.from(listOfCategories).forEach((item) => {
    item.addEventListener("click", function () {
      Array.from(listOfCategories).forEach((li) => {
        li.classList.remove("active");
      });
      item.classList.add("active");
    });
  });
}
getCategories();

let ulList = document.getElementById("categoryList");
function createCategoriesList(category) {
  let li = document.createElement("li");
  li.textContent = category.categoryName;
  ulList.appendChild(li);
}

async function getProducts() {
  try {
    
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}
