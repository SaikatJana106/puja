function normalizeImagePath(path) {
    return String(path || "").replace(/^\.\.\//, "");
}

function formatPrice(price) {
    return typeof price === "number" ? `Rs ${price.toLocaleString()}` : "Price unavailable";
}

async function loadCollection() {
    const container = document.getElementById("categoryContainer");
    if (!container) return;

    try {
        const response = await fetch("data/collection.json");
        const categories = await response.json();

        container.innerHTML = "";
        categories.forEach((category) => {
            const col = document.createElement("div");
            col.className = "d-flex justify-content-center align-items-center flex-column  zoom-up";
            col.innerHTML = `
                <img style="height:136px; width:136px;" src="${normalizeImagePath(category.image)}" alt="${category.name}">
                <p>${category.name}</p>
            `;
            container.appendChild(col);
        });
    } catch (error) {
        console.error("Error loading categories:", error);
    }
}

async function loadNewArrivals() {
    const container = document.getElementById("productContainer");
    if (!container) return;

    try {
        const response = await fetch("data/newarrivals.json");
        const products = await response.json();

        container.innerHTML = "";
        products.forEach((product) => {
            container.innerHTML += `
                <div style="min-width:200px" class="col-md-3 col-sm-6">
                    <div class="product-card">
                        <img src="${normalizeImagePath(product.image)}" alt="${product.name}">
                        <div class="product-info">
                            <h6 class="line-clamp-1">${product.name}</h6>
                            <p class="price">${formatPrice(product.price)}</p>
                            <button class="btn-cart" onclick="addToCart(${product.id})">
                                ADD TO CART
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
    } catch (error) {
        console.error("Error loading new arrivals:", error);
    }
}

async function loadBestSellers() {
    const container = document.getElementById("bestsellContainer");
    if (!container) return;

    try {
        const response = await fetch("data/newarrivals.json");
        const products = await response.json();

        container.innerHTML = "";
        products.forEach((product) => {
            container.innerHTML += `
                <div class="col-xl-3 col-lg-4 col-6">
                    <div class="product-card">
                        <img src="${normalizeImagePath(product.image)}" alt="${product.name}">
                        <div class="product-info">
                            <h6 class="line-clamp-1">${product.name}</h6>
                            <p class="price">${formatPrice(product.price)}</p>
                            <button class="btn-cart" onclick="addToCart(${product.id})">
                                ADD TO CART
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
    } catch (error) {
        console.error("Error loading best sellers:", error);
    }
}

function addToCart(id) {
    alert("Product added to cart: " + id);
}

window.addToCart = addToCart;

document.addEventListener("DOMContentLoaded", () => {
    loadCollection();
    loadNewArrivals();
    loadBestSellers();
});


// navbar footer call 
document.addEventListener("DOMContentLoaded", function () {

    fetch("navbar.html")
        .then(res => res.text())
        .then(data => {
            document.getElementById("navbar").innerHTML = data;
        });

    fetch("footer.html")
        .then(res => res.text())
        .then(data => {
            document.getElementById("footer").innerHTML = data;
        });

});

// navbar 
document.addEventListener("DOMContentLoaded", function () {

    fetch("navbar.html")
        .then(res => res.text())
        .then(data => {
            document.getElementById("navbar").innerHTML = data;

            // AFTER navbar loads
            const toggle = document.querySelector(".menu-toggle");
            const mobileMenu = document.querySelector(".mobile-menu");

            if (toggle) {
                toggle.addEventListener("click", function () {
                    mobileMenu.classList.toggle("show");
                });
            }
        });

    fetch("footer.html")
        .then(res => res.text())
        .then(data => {
            document.getElementById("footer").innerHTML = data;
        });

});