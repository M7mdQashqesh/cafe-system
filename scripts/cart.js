document.querySelector(".logo").addEventListener("click", function () {
  window.location.href = "../index.html";
});

document.querySelector(".go-back").addEventListener("click", function () {
  history.back();
});

let productsContainer = document.getElementById("products");

let products = JSON.parse(window.localStorage.getItem("cartProducts")) || [];
if (products.length === 0) {
  productsContainer.innerHTML = `<p class="empty-cart">No Items In Your Cart</p>`;
}

let totalPricesDiv = document.getElementById("total-price-for-total-products");

function generateCartProducts() {
  products.forEach((product) => {
    let productDiv = `
    <div class="product-div" >
      <div class="product-image" style="background-image: url(${product.src});"></div>
      <div class="details">
        <div class="name-and-trash">
          <p>${product.name}</p>
          <i class="fa-solid fa-trash"></i>
        </div>
        <p class="description">${product.description}</p>
        <div class="quantity-price">
          <p>Quantity: ${product.quantity}</p>
          <p>${product.totalPrice} ₪</p>
        </div>
        <br />
      </div>
    </div>
    `;

    productsContainer.innerHTML += productDiv;
  });
}
generateCartProducts();

productsContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("fa-trash")) {
    let index = Array.from(
      productsContainer.querySelectorAll(".fa-trash")
    ).indexOf(e.target);
    products.splice(index, 1);
    window.localStorage.setItem("cartProducts", JSON.stringify(products));
    productsContainer.innerHTML = "";
    generateCartProducts();
    if (products.length === 0) {
      productsContainer.innerHTML = `<p class="empty-cart">No Items In Your Cart</p>`;
      totalPricesDiv.style.display = "none";
    } else {
      totalPricesDiv.innerHTML = "";
      generateTotalPriceForTotalProducts();
    }

    // Notification
    Toastify({
      text: "The product was removed from the cart",
      duration: 3000,
      gravity: "top",
      position: "right",
      stopOnFocus: false,
      style: {
        background: "linear-gradient(to right, #ff416c, #ff4b2b)",
      },
      onClick: function () {},
    }).showToast();
  }
});

let shippingCost = 15;
function generateTotalPriceForTotalProducts() {
  let totalPriceForTotalProducts = 0;
  products.forEach((product) => {
    totalPriceForTotalProducts += Number(product.totalPrice);
  });

  let totalPriceForTotalProductsHTML = `
  <div class="sub-total">
    <p>Sub Total (${products.length} item/s)</p>
    <p>${totalPriceForTotalProducts} ₪</p>
  </div>
  <div class="shipping">
    <p>Shipping</p>
    <p>15 ₪</p>
  </div>
  <br />
  <hr />
  <div class="total-cost">
    <p>Total Price</p>
    <p>${totalPriceForTotalProducts + shippingCost} ₪</p>
  </div>
  <button class="checkout">Checkout</button>
  `;

  totalPricesDiv.innerHTML = totalPriceForTotalProductsHTML;
}
if (products.length > 0) {
  generateTotalPriceForTotalProducts();
} else {
  totalPricesDiv.style.display = "none";
}
