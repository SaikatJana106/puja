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
                        <div class="product-image-wrap">
                            <img src="${normalizeImagePath(product.image)}" alt="${product.name}">
                            <div class="product-actions" aria-label="Product quick actions">
                                <div class="action-buttons">
                                    <button class="action-btn" type="button" aria-label="Add to wishlist" data-tooltip="Add to Wishlist">
                                        <i class="bi bi-heart"></i>
                                    </button>
                                    <button class="action-btn" type="button" aria-label="Add to cart" data-tooltip="Add to Cart" onclick="addToCart(${product.id})">
                                        <i class="bi bi-cart"></i>
                                    </button>
                                    <button class="action-btn" type="button" aria-label="Quick view" data-tooltip="Quick View">
                                        <i class="bi bi-zoom-in"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
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
                <div class="custom-col-5">
                    <div class="product-card">
                        <div class="product-image-wrap">
                            <img style="cursor: pointer" src="${normalizeImagePath(product.image)}" alt="${product.name}">
                            <div class="product-actions" aria-label="Product quick actions">
                                <div class="action-buttons">
                                    <button class="action-btn" type="button" aria-label="Add to wishlist" data-tooltip="Add to Wishlist">
                                        <i class="bi bi-heart" style="font-size:20px;"></i>
                                    </button>
                                    <button class="action-btn" type="button" aria-label="Add to cart" data-tooltip="Add to Cart" onclick="addToCart(${product.id})">
                                        <i class="bi bi-cart" style="font-size:20px;"></i>
                                    </button>
                                    <button class="action-btn" type="button" aria-label="Quick view" data-tooltip="Quick View">
                                        <i class="bi bi-zoom-in" style="font-size:20px;"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="product-info">
                            <h6 class="line-clamp-1 product-name">${product.name}</h6>
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
    fetch("topbar.html")
        .then(res => res.text())
        .then(data => {
            document.getElementById("topbar").innerHTML = data;
        });
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


document.addEventListener("DOMContentLoaded", function () {
    const row = document.getElementById("instaRow");
    const leftBtn = document.querySelector(".insta-arrow.left");
    const rightBtn = document.querySelector(".insta-arrow.right");

    if (!row || !leftBtn || !rightBtn) return;

    const updateArrowVisibility = () => {
        const maxScrollLeft = row.scrollWidth - row.clientWidth;
        const hasOverflow = maxScrollLeft > 1;

        if (!hasOverflow) {
            leftBtn.style.display = "none";
            rightBtn.style.display = "none";
            return;
        }

        // In carousel mode both arrows stay visible whenever content overflows.
        leftBtn.style.display = "flex";
        rightBtn.style.display = "flex";
    };

    const getStep = () => {
        const cards = row.querySelectorAll(".insta-card");
        if (!cards.length) return 320;
        if (cards.length > 1) {
            const distance = cards[1].offsetLeft - cards[0].offsetLeft;
            if (distance > 0) return distance;
        }
        return cards[0].getBoundingClientRect().width;
    };

    let isAnimating = false;

    rightBtn.addEventListener("click", () => {
        if (isAnimating) return;
        isAnimating = true;

        const step = getStep();
        row.scrollBy({ left: step, behavior: "smooth" });

        setTimeout(() => {
            const firstCard = row.firstElementChild;
            if (firstCard) row.appendChild(firstCard);
            row.scrollLeft = Math.max(0, row.scrollLeft - step);
            isAnimating = false;
        }, 360);
    });

    leftBtn.addEventListener("click", () => {
        if (isAnimating) return;
        isAnimating = true;

        const step = getStep();
        const lastCard = row.lastElementChild;
        if (lastCard) {
            row.insertBefore(lastCard, row.firstElementChild);
            row.scrollLeft += step;
        }

        requestAnimationFrame(() => {
            row.scrollBy({ left: -step, behavior: "smooth" });
        });

        setTimeout(() => {
            isAnimating = false;
        }, 360);
    });

    row.addEventListener("scroll", updateArrowVisibility, { passive: true });
    window.addEventListener("resize", updateArrowVisibility);

    updateArrowVisibility();
});

document.addEventListener("click", function (event) {
    const toggle = event.target.closest(".footer-toggle");
    if (!toggle || window.innerWidth > 766) return;

    const section = toggle.closest(".footer-collapsible");
    if (!section) return;

    section.classList.toggle("open");
    const isOpen = section.classList.contains("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
});


// go to top button call 
document.addEventListener("DOMContentLoaded", function () {
  const topButtonHost = document.getElementById("topbutton");
  if (!topButtonHost) return;

  fetch("topbutton.html")
    .then((res) => res.text())
    .then((data) => {
      topButtonHost.innerHTML = data;
    })
    .catch((err) => console.error("Error loading top button:", err));
});

// bottom nav call 
document.addEventListener("DOMContentLoaded", function () {
  const bottomnavHost = document.getElementById("bottomnav");
  if (!bottomnavHost) return;

  fetch("bottomnav.html")
    .then((res) => res.text())
    .then((data) => {
      bottomnavHost.innerHTML = data;
    })
    .catch((err) => console.error("Error loading top button:", err));
});

function safeShowDialogModal(dialog) {
  if (!dialog) return;
  try {
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  } catch {
    dialog.setAttribute("open", "");
  }
}

function safeCloseDialog(dialog) {
  if (!dialog) return;
  try {
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
  } catch {
    dialog.removeAttribute("open");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('dialog[data-auto-show="true"]').forEach((dialog) => {
    safeShowDialogModal(dialog);
  });
});

document.addEventListener("click", function (event) {
  const closeTrigger = event.target.closest("[data-dialog-close]");
  if (closeTrigger) {
    safeCloseDialog(closeTrigger.closest("dialog"));
    return;
  }

  const openTrigger = event.target.closest("[data-dialog-open]");
  if (openTrigger) {
    const targetId = openTrigger.getAttribute("data-dialog-open");
    if (!targetId) return;
    const dialog = document.getElementById(targetId);
    safeShowDialogModal(dialog);
  }
});
