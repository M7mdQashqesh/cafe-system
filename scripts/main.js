async function getData(link, place) {
  let productsArea = document.querySelector(`.varieties .${place} .products`);

  let allData = await fetch(link);
  allData = await allData.json();
  for (let i = 0; i < allData.length; i++) {
    let div = document.createElement("div");
    div.className = "product";

    let imageContainer = document.createElement("div");
    imageContainer.style.backgroundImage = `url(${allData[i].src})`;
    imageContainer.style.backgroundSize = "cover";
    imageContainer.style.backgroundPosition = "center";
    imageContainer.style.width = "100%";
    imageContainer.style.height = "220px";
    div.appendChild(imageContainer);

    let productName = document.createElement("p");
    productName.className = "product-name";
    productName.textContent = allData[i].name;
    div.appendChild(productName);

    let shortDesc = document.createElement("p");
    shortDesc.className = "short-description";
    shortDesc.textContent = allData[i].shortDescription;
    div.appendChild(shortDesc);

    let productPrice = document.createElement("p");
    productPrice.className = "product-price";
    productPrice.textContent = allData[i].price;
    div.appendChild(productPrice);

    div.addEventListener("click", function () {
      let pDetails = {
        src: allData[i].src,
        name: allData[i].name,
        longDescription: allData[i].longDescription,
        price: allData[i].price,
      };
      window.localStorage.setItem("productDetails", JSON.stringify(pDetails));
      window.location.href = "../pages/productDetails.html";
    });

    productsArea.appendChild(div);
  }
}
getData("../jsons/drinks.json", "drinks");
getData("../jsons/sweets.json", "sweets");

let categoriesList = document.querySelectorAll(".categories ul li a");
categoriesList.forEach((list) => {
  list.addEventListener("click", function (e) {
    e.preventDefault();
    categoriesList.forEach((btn) => {
      btn.classList.remove("active");
    });
    list.classList.add("active");

    if (e.target.textContent === "All") {
      document.querySelector(".drinks").classList.remove("hidden");
      document.querySelector(".sweets").classList.remove("hidden");
    }

    if (e.target.textContent === "Drinks") {
      document.querySelector(".drinks").classList.remove("hidden");
      document.querySelector(".sweets").classList.add("hidden");
    }
    if (e.target.textContent === "Sweets") {
      document.querySelector(".sweets").classList.remove("hidden");
      document.querySelector(".drinks").classList.add("hidden");
    }
  });
});
