let cart = document.querySelector(".fa-cart-shopping");
cart.addEventListener("click", function () {
  window.location.href = "../pages/cart.html";
});

let loginBtn = document.querySelector(".fa-right-to-bracket");
loginBtn.addEventListener("click", function () {
  window.location.href = "../pages/login.html";
});

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

let categoriesList = document.querySelectorAll(".categories ul li a");
categoriesList.forEach((list) => {
  list.addEventListener("click", function (e) {
    e.preventDefault();
    // Remove the "active" class from all category links
    categoriesList.forEach((btn) => {
      btn.classList.remove("active");
    });

    // Add the "active" class to the clicked category link
    list.classList.add("active");

    // Show both drinks and sweets if "All" category is selected
    if (e.target.textContent === "All") {
      document.querySelector(".drinks").classList.remove("hidden");
      document.querySelector(".sweets").classList.remove("hidden");
    }

    // Show only drinks and hide sweets if "Drinks" category is selected
    if (e.target.textContent === "Drinks") {
      document.querySelector(".drinks").classList.remove("hidden");
      document.querySelector(".sweets").classList.add("hidden");
    }

    // Show only sweets and hide drinks if "Sweets" category is selected
    if (e.target.textContent === "Sweets") {
      document.querySelector(".sweets").classList.remove("hidden");
      document.querySelector(".drinks").classList.add("hidden");
    }
  });
});
