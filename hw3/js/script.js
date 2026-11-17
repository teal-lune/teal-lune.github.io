// Default quantity of products to load
const qty = 25;

// Event listeners
document.addEventListener("DOMContentLoaded", loadProducts(qty, "", ""));
document.querySelector("#minPrice").addEventListener("change", validatePrice);
document.querySelector("#maxPrice").addEventListener("change", validatePrice);
document.querySelector("#search").addEventListener("submit", (event) =>{event.preventDefault(); searchProducts(qty);});

function validatePrice(){
    let err = document.querySelector("#validationErr");
    err.textContent = "";
    let minPrice = document.querySelector("#minPrice").value;
    let maxPrice = document.querySelector("#maxPrice").value;
    if(Number(minPrice) < 0 || Number(maxPrice) < 0){
        err.textContent = "Price cannot be negative";
        return false;
    }
    return true;
}

async function loadProducts(quantity, min, max){
    let productContainer = document.querySelector("#product-container");
    productContainer.textContent = "";


    const loader = document.querySelector("#loader");
    loader.classList.remove("d-none");

    try {
        let url = `https://fakerapi.it/api/v2/products?_quantity=${quantity}&_price_min=${min}&_price_max=${max}&_categories_type=uuid`;
        let response = await fetch(url);
        let data = await response.json();

        let rand = 1;

        for (let item of data.data) {
            let card = document.createElement("div");
            card.className = "card";
            let productImage = document.createElement("img");

            //Adding the random parameter to get different photos
            productImage.src = item.images[1].url + "?random=" + rand;
            productImage.alt = item.name;
            productImage.className = "card-img-top";

            let cardBody = document.createElement("div");
            cardBody.className = "card-body";

            let productName = document.createElement("h5");
            productName.className = "card-title";
            productName.textContent = item.name.slice(0, 15);

            let productDescription = document.createElement("p");
            productDescription.className = "card-text";
            productDescription.textContent = item.description.slice(0, 50) + "...";

            let productPrice = document.createElement("p");
            productPrice.className = "card-text";
            productPrice.textContent = "Fake Price: $" + item.price;

            let btn = document.createElement("button");
            btn.className = "btn btn-dark";
            btn.textContent = "Add to Fake Cart"


            cardBody.appendChild(productName);
            cardBody.appendChild(productDescription);
            cardBody.appendChild(productPrice);
            cardBody.appendChild(btn);

            card.appendChild(productImage);
            card.appendChild(cardBody);
            productContainer.appendChild(card);
            rand++;
        }
    } catch (error) {
        console.error(error);
    } finally {
        loader.classList.add("d-none");
    }
}

async function searchProducts(quantity){
    let minPrice = document.querySelector("#minPrice").value;
    let maxPrice = document.querySelector("#maxPrice").value;
    let err = document.querySelector("#validationErr");
    err.textContent = "";

    let isValid = true;

    if(!validatePrice()){
        isValid = false;
    }

    minPrice = minPrice ? Number(minPrice) : null;
    maxPrice = maxPrice ? Number(maxPrice) : null;

    if(minPrice === null && maxPrice === null){
        isValid = false;
        err.textContent = "Set at least 1 search parameter."
    }

    if(minPrice !== null && maxPrice !== null && minPrice > maxPrice){
        console.log("came here");
        isValid = false;
        err.textContent = "Min price cannot be larger than max price."
    }

    let min = minPrice !== null ? minPrice.toFixed(2) : "";
    let max = maxPrice !== null ? maxPrice.toFixed(2) : "";

    if(isValid){
        await loadProducts(quantity, min, max);
    }
}