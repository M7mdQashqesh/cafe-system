document.querySelector(".logo").addEventListener("click", function () {
  window.location.href = "../index.html";
});

document.querySelector(".go-back").addEventListener("click", function () {
  history.back();
});

let productsContainer = document.getElementById("products");
let products = JSON.parse(window.localStorage.getItem("cartDetails"));

function generateCartProducts() {
  products.forEach((product) => {
    let productDiv = `
  <div style="display:flex; justify-content: space-between; gap:20px; align-items:center; background-color:var(--secondary-color); padding :0 15px; margin-bottom: 20px">
    <div style="background-image: url(${product.src}); background-size: cover; background-position: center center; width: 80px; height: 80px;"></div>
    <div style="flex:1">
      <div style="display:flex; align-items: center; justify-content: space-between">
        <p style="color:white; font-weight:bold">${product.name}</p>
        <i class="fa-solid fa-trash" style="color:white;font-size:14px"></i>
      </div>
      <div style="display:flex;justify-content:space-between ">
        <div style="display: flex; gap: 10px; align-items:center;">
          <button onclick="increaseQuantity()" style="background : var(--primary-color); border:none; outline:none; color:white; font-size:18px; width:20px">+</button>
          <input type="number" value=${product.quantity} min="1" style="width:50px ;border:none; outline:none; background:var(--primary-color); padding: 5px; color: white; text-align:center; font-size: 16px"/>
          <button onclick="decreaseQuantity()" style="background : var(--primary-color); border:none; outline:none;   color:white; font-size:18px; width:20px">-</button>
        </div>
        <p style="color:white; font-weight:bold">${product.totalPrice} ₪</p>
      </div>
    </div>
  </div>
  `;

    productsContainer.innerHTML += productDiv;

    let trashes = document.querySelectorAll(".fa-trash");
    trashes.forEach((trash) => {
      trash.addEventListener("click", function () {
        products.splice(products.indexOf(product), 1);
        window.localStorage.setItem("cartDetails", JSON.stringify(products));
        productsContainer.innerHTML = "";
        generateCartProducts();
      });
    });
  });
}
generateCartProducts();
