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

async function getCategories() {
  document.querySelector("main").style.display = "none";
  document.getElementById("loading").style.display = "block";
  try {
    let useRef = collection(firestore, "categories");
    let querySnapshot = await getDocs(useRef);
    querySnapshot.forEach(async (doc) => {
      let varietyRef = collection(firestore, doc.data().categoryName);
      let varietyQuerySnapshot = await getDocs(varietyRef);
      if (varietyQuerySnapshot.size === 0) {
        return;
      }
      createVarietiesArea(doc.data());
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
  } finally {
    document.querySelector("main").style.display = "block";
    document.getElementById("loading").style.display = "none";
  }
}
getCategories();

function createVarietiesArea(category) {
  let varietiesArea = document.getElementById("varieties");

  let categoryContainer = document.createElement("div");
  let safeClass = `${category.categoryName.replace(/\s+/g, "-").toLowerCase()}`;
  categoryContainer.className = safeClass;

  let categoryTitle = document.createElement("p");
  categoryTitle.textContent = category.categoryName;
  categoryContainer.appendChild(categoryTitle);

  let categoryProducts = document.createElement("div");
  categoryProducts.className = "products";
  categoryContainer.appendChild(categoryProducts);

  varietiesArea.appendChild(categoryContainer);

  getProducts(category);
}

// Get Data From Firestore depend on Categories
async function getProducts(category) {
  try {
    const useRef = collection(firestore, category.categoryName);
    const querySnapshot = await getDocs(useRef);

    let safeClass = `${category.categoryName
      .replace(/\s+/g, "-")
      .toLowerCase()}`;
    let productsArea = document.querySelector(
      `.varieties .${safeClass} .products`
    );

    querySnapshot.forEach((doc) => {
      let productDiv = document.createElement("div");
      productDiv.className = "product";

      let imageContainer = document.createElement("div");
      imageContainer.className = "bg-image";
      imageContainer.style.cssText = `background-image: url(${
        doc.data().productImage
      });`;
      productDiv.appendChild(imageContainer);

      let productName = document.createElement("p");
      productName.className = "product-name";
      productName.textContent = doc.data().productName;
      productDiv.appendChild(productName);

      let description = document.createElement("p");
      description.className = "description";
      description.textContent = doc.data().productDescription;
      productDiv.appendChild(description);

      let productPrice = document.createElement("p");
      productPrice.className = "product-price";
      productPrice.textContent = `${doc.data().productPrice} ₪`;
      productDiv.appendChild(productPrice);

      // Save selected product details in localStorage and redirect to the product details page
      productDiv.addEventListener("click", function () {
        let pDetails = {
          src: doc.data().productImage,
          name: doc.data().productName,
          description: doc.data().productDescription,
          price: doc.data().productPrice,
        };
        window.localStorage.setItem("productDetails", JSON.stringify(pDetails));
        window.location.href = "../pages/productDetails.html";
      });

      productsArea.appendChild(productDiv);
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}
