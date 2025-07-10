import { firestore } from "../firebase.js";
import {
  doc,
  getDocs,
  collection,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

let loggedUser = JSON.parse(window.localStorage.getItem("user"));

if (!loggedUser) {
  window.location.href = "../../pages/login.html";
}

let menuBtn = document.querySelector(".fa-bars");
let menuNav = document.querySelector("nav");
let ul = document.querySelector("ul");

menuBtn.addEventListener("click", function () {
  menuNav.classList.add("show");
  ul.classList.add("show");

  menuNav.classList.remove("hide");
  ul.classList.remove("hide");

  // prevent scroll
  document.body.style.overflow = "hidden";
});

menuNav.addEventListener("click", function (e) {
  if (
    e.target === menuNav ||
    e.target === document.querySelector(".fa-xmark")
  ) {
    menuNav.classList.remove("show");
    ul.classList.remove("show");

    menuNav.classList.add("hide");
    ul.classList.add("hide");

    // allow scroll
    document.body.style.overflow = "auto";
  }
});

let list = document.querySelectorAll("nav ul li");
list.forEach((el) => {
  el.addEventListener("click", function (e) {
    if (el.children[1].textContent === "Upload Products") {
      window.location.href = "../../pages/dashboard/uploadProduct.html";
    } else if (el.children[1].textContent === "Delete Product") {
      window.location.href = "../../pages/dashboard/deleteProduct.html";
    }
  });
});

let mainDiv = document.querySelector("main");

getData();
async function getData() {
  try {
    const querySnapshot = await getDocs(collection(firestore, "products"));
    if (querySnapshot.size > 0) {
      querySnapshot.forEach((doc) => {
        createProductDiv(doc.data());
      });
    } else {
      mainDiv.innerHTML = `<p class="empty-products">You Have Not Added Any Product</p>`;
    }
  } catch (error) {
    console.error("Failed To Fetch Data: ", error);
  }
}

function createProductDiv(productInfo) {
  let product = `
    <div class="product-div" >
      <div class="product-image" style="background-image: url(${productInfo.productImage});"></div>
      <div class="details">
        <div class="name-and-trash">
          <p>${productInfo.productName}</p>
          <i class="fa-solid fa-trash"></i>
        </div>
        <p class="description">${productInfo.productDescription}</p>
        <p class="price">${productInfo.productPrice} ₪</p>
      </div>
    </div>
  `;
  mainDiv.innerHTML += product;
}
