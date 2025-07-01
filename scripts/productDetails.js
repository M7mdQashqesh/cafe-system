let productDetails = JSON.parse(window.localStorage.getItem("productDetails"));
let productDetailsDiv = document.getElementById("product-details");
let goBackBtn = document.querySelector(".go-back");
let quantity = 1;

if (productDetails) {
  generateProductDetails();
}

goBackBtn.addEventListener("click", function () {
  window.location.href = "../index.html";
});

function generateProductDetails() {
  let details = `
  <div style="background-image: url(${productDetails.src}); background-size: cover; background-position: center center; width: 100%; height: 440px;"></div>
  <p style="color:white; font-weight:bold; font-size: 25px">${productDetails.name}</p>
  <p style="color:#777; line-height: 1.6; font-size: 18px">${productDetails.longDescription}</p>

  <div style="display:flex; align-items: center; justify-content: space-between;  margin-bottom: 100px">
    <p style="color:white; font-size: 20px; font-weight:bold">Quantity:</p>
    <div style="display: flex; gap: 10px;">
      <button onclick="increaseQuantity()" style="background : var(--secondary-color); border:none; outline:none; color:white; font-size:30px; width:40px">+</button>
      <input type="number" value=${quantity} min="1" style="width:80px ;border:none; outline:none; background:var(--secondary-color);padding: 5px; color: white; text-align:center; font-size: 20px"/>
      <button onclick="decreaseQuantity()" style="background : var(--secondary-color); border:none; outline:none; color:white; font-size:30px; width:40px">-</button>
    </div>
  </div>

  <div style="position:fixed; width:100%; left:0;bottom:0; background: var(--secondary-color); display: flex; align-items:center; justify-content: space-between; padding: 0px 30px;">
    <p style="color:white; font-size:25px; font-weight:bold">${productDetails.price}</p>
    <button onclick="addToCart()" style="padding: 8px 20px; font-size: 20px; border:none;outline:none; border-radius: 6px; background-color:white;font-weight:bold">Add To Cart</button>
  </div>
  `;
  productDetailsDiv.innerHTML = details;

  document.querySelector("input").addEventListener("blur", function () {
    let val = parseInt(this.value);
    if (isNaN(val) || val < 1) {
      quantity = 1;
      this.value = quantity;
    } else {
      quantity = val;
    }
  });
}

function increaseQuantity() {
  quantity++;
  document.querySelector("input").value = quantity;
}

function decreaseQuantity() {
  if (quantity > 1) {
    quantity--;
    document.querySelector("input").value = quantity;
  }
}

function addToCart() {
  let cartDetails =
    JSON.parse(window.localStorage.getItem("cartDetails")) || [];
  let pDetails = {
    name: productDetails.name,
    price: productDetails.price,
    pQuantity: quantity,
  };
  cartDetails.push(pDetails);
  window.localStorage.setItem("cartDetails", JSON.stringify(cartDetails));
}
