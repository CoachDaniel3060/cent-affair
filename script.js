
/* ==========================================
   CENT AFFAIR — FINAL STORE SCRIPT
   THE ART OF FRAGRANCE
   ========================================== */

"use strict";

const STORE = {
  name: "CENT AFFAIR",
  whatsapp: "233249964486",
  currency: "GH₵"
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=85";

const CART_KEY = "cent-affair-shopping-cart";

/* ==========================================
   PRODUCT CATALOGUE
   Sample products and prices — update with
   the actual catalogue before accepting orders.
   ========================================== */

const products = [
  {
    id: 1,
    name: "Midnight Oud",
    category: "Men",
    price: 350,
    badge: "BESTSELLER",
    description: "A bold fragrance with rich oud and warm woody notes.",
    image: "https://images.unsplash.com/photo-1739190940453-20900e9d18fb?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 2,
    name: "Golden Bloom",
    category: "Women",
    price: 280,
    badge: "POPULAR",
    description: "A beautiful floral fragrance with a soft, elegant finish.",
    image: "https://images.unsplash.com/photo-1680607621633-164ca52ed65b?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 3,
    name: "Velvet Rose",
    category: "Women",
    price: 320,
    badge: "",
    description: "Romantic rose notes with a luxurious warm base.",
    image: "https://images.unsplash.com/photo-1707539159789-3a5460e08d68?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 4,
    name: "Royal Essence",
    category: "Men",
    price: 400,
    badge: "LUXURY",
    description: "A confident masculine scent with a refined character.",
    image: "https://images.unsplash.com/photo-1716978499366-d5a84bf1fe70?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 5,
    name: "Amber Touch",
    category: "Unisex",
    price: 300,
    badge: "",
    description: "Warm amber notes for a memorable everyday fragrance.",
    image: "https://images.unsplash.com/photo-1635796332668-78830169097d?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 6,
    name: "Blush Affair",
    category: "Women",
    price: 260,
    badge: "NEW",
    description: "A delicate and feminine scent for special moments.",
    image: "https://images.unsplash.com/photo-1773527142304-58116364b8a1?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 7,
    name: "Ocean Noir",
    category: "Men",
    price: 380,
    badge: "",
    description: "Fresh aquatic notes meet a sophisticated woody finish.",
    image: "https://images.unsplash.com/photo-1631573576452-a073df952614?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 8,
    name: "Silk Musk",
    category: "Unisex",
    price: 250,
    badge: "",
    description: "A smooth, clean musk fragrance with understated elegance.",
    image: "https://images.unsplash.com/photo-1666621630026-862eea07236c?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 9,
    name: "Royal Petals",
    category: "Women",
    price: 340,
    badge: "FAVOURITE",
    description: "A graceful floral fragrance with a lasting impression.",
    image: "https://images.unsplash.com/photo-1714218723982-95803a4b23d1?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 10,
    name: "Black Signature",
    category: "Men",
    price: 450,
    badge: "PREMIUM",
    description: "A striking fragrance for lovers of bold sophistication.",
    image: "https://images.unsplash.com/photo-1723391962154-8a2b6299bc09?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 11,
    name: "Soft Vanilla",
    category: "Unisex",
    price: 290,
    badge: "",
    description: "Comforting vanilla notes with a creamy finish.",
    image: "https://images.unsplash.com/photo-1609749282774-5883a366cdd1?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 12,
    name: "Eternal Elegance",
    category: "Women",
    price: 370,
    badge: "EXCLUSIVE",
    description: "An elegant fragrance designed to leave a lasting impression.",
    image: FALLBACK_IMAGE
  }
];

/* ==========================================
   APPLICATION STATE
   ========================================== */

let cart = [];
let activeCategory = "all";
let searchTerm = "";

try {
  const savedCart = JSON.parse(localStorage.getItem(CART_KEY));

  if (Array.isArray(savedCart)) {
    cart = savedCart
      .filter(item =>
        products.some(product => product.id === Number(item.id))
      )
      .map(item => {
        const product = products.find(p => p.id === Number(item.id));

        return {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: Math.max(1, Math.min(99, Number(item.quantity) || 1))
        };
      });
  }
} catch (error) {
  cart = [];
}

/* ==========================================
   GENERAL HELPERS
   ========================================== */

function $(id) {
  return document.getElementById(id);
}

function formatPrice(amount) {
  return `${STORE.currency} ${Number(amount).toLocaleString("en-GH")}`;
}

function saveCart() {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (error) {
    console.warn("Cart could not be saved.", error);
  }
}

function normalizeCategory(value) {
  const text = String(value || "")
    .toLowerCase()
    .replace(/[^a-z]/g, "");

  if (text.includes("unisex")) return "unisex";
  if (text.includes("women") || text.includes("female")) return "women";
  if (text === "men" || text.includes("formen") || text.includes("male")) return "men";
  if (text.includes("all") || text.includes("every")) return "all";

  return text;
}

function showNotice(message) {
  let notice = $("storeNotice");

  if (!notice) {
    notice = document.createElement("div");
    notice.id = "storeNotice";

    notice.style.cssText = `
      position:fixed;
      bottom:85px;
      left:50%;
      transform:translateX(-50%);
      background:#11100e;
      color:#fffdf9;
      padding:14px 22px;
      border:1px solid #c5a36a;
      border-radius:4px;
      z-index:99999;
      font-size:12px;
      text-align:center;
      max-width:90%;
      box-shadow:0 8px 30px rgba(0,0,0,.2);
    `;

    document.body.appendChild(notice);
  }

  notice.textContent = message;
  notice.style.display = "block";

  clearTimeout(notice.timer);

  notice.timer = setTimeout(() => {
    notice.style.display = "none";
  }, 2600);
}

function setImageFallbacks(root = document) {
  root.querySelectorAll("img[data-fallback]").forEach(img => {
    if (img.dataset.fallbackReady) return;

    img.dataset.fallbackReady = "true";

    img.addEventListener("error", function () {
      this.onerror = null;
      this.src = FALLBACK_IMAGE;
    }, { once: true });
  });
}

/* ==========================================
   PRODUCT FILTERING AND SEARCH
   ========================================== */

function renderProducts() {
  const grid = $("productGrid");
  const empty = $("emptyProducts");

  if (!grid) return;

  const filtered = products.filter(product => {
    const categoryMatches =
      activeCategory === "all" ||
      normalizeCategory(product.category) === activeCategory;

    const term = searchTerm.toLowerCase();

    const searchMatches =
      product.name.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term);

    return categoryMatches && searchMatches;
  });

  grid.innerHTML = filtered.map(product => `
    <article class="product-card">
      <div class="product-image-wrap">
        <img
          class="product-image"
          src="${product.image}"
          alt="${product.name} perfume"
          loading="lazy"
          data-fallback
        >

        ${product.badge
          ? `<span class="product-badge">${product.badge}</span>`
          : ""}
      </div>

      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">${formatPrice(product.price)}</p>

        <div class="product-actions">
          <button
            class="add-button"
            type="button"
            onclick="addToCart(${product.id})"
          >
            ADD TO BAG
          </button>

          <button
            class="quick-view"
            type="button"
            onclick="openQuickView(${product.id})"
          >
            VIEW
          </button>
        </div>
      </div>
    </article>
  `).join("");

  if (empty) {
    empty.style.display = filtered.length ? "none" : "block";
  }

  setImageFallbacks(grid);
}

function setActiveFilter(category) {
  activeCategory = normalizeCategory(category);

  const container = $("filterButtons");

  if (container) {
    container.querySelectorAll("button").forEach(button => {
      const buttonCategory = normalizeCategory(
        button.dataset.category ||
        button.dataset.filter ||
        button.textContent
      );

      const isActive = buttonCategory === activeCategory;

      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  renderProducts();
}

function setupFilters() {
  const container = $("filterButtons");

  if (!container) return;

  container.addEventListener("click", event => {
    const button = event.target.closest("button");

    if (!button || !container.contains(button)) return;

    const category = normalizeCategory(
      button.dataset.category ||
      button.dataset.filter ||
      button.textContent
    );

    if (["all", "men", "women", "unisex"].includes(category)) {
      setActiveFilter(category);
    }
  });

  setActiveFilter("all");
}

function setupSearch() {
  const search = $("productSearch");

  if (!search) return;

  search.addEventListener("input", event => {
    searchTerm = event.target.value.trim();
    renderProducts();
  });
}

/* COLLECTION CARDS */

function setupCollections() {
  document.querySelectorAll("[data-collection]").forEach(card => {
    card.addEventListener("click", () => {
      const category = normalizeCategory(card.dataset.collection);

      setActiveFilter(category);

      if ($("productSearch")) {
        $("productSearch").value = "";
      }

      searchTerm = "";
    });
  });
}

/* ==========================================
   SHOPPING CART
   ========================================== */

function addToCart(id) {
  const product = products.find(item => item.id === id);

  if (!product) return;

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  saveCart();
  renderCart();

  showNotice(`${product.name} added to your bag.`);
}

function changeQuantity(id, change) {
  const item = cart.find(product => product.id === id);

  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    cart = cart.filter(product => product.id !== id);
  }

  saveCart();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);

  saveCart();
  renderCart();

  showNotice("Item removed from your bag.");
}

function getCartCount() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

function getCartTotal() {
  return cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}

function renderCart() {
  const items = $("cartItems");
  const count = $("cartCount");
  const total = $("cartTotal");
  const checkoutTotal = $("checkoutTotal");

  if (count) {
    count.textContent = getCartCount();
  }

  if (total) {
    total.textContent = formatPrice(getCartTotal());
  }

  if (checkoutTotal) {
    checkoutTotal.textContent = formatPrice(getCartTotal());
  }

  if (!items) return;

  if (!cart.length) {
    items.innerHTML = `
      <div class="cart-empty">
        <p>Your shopping bag is currently empty.</p>
        <p>Discover a fragrance you'll love.</p>
      </div>
    `;

    return;
  }

  items.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img
        src="${item.image}"
        alt="${item.name}"
        data-fallback
      >

      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>${formatPrice(item.price)}</p>

        <div class="quantity-controls">
          <button
            type="button"
            onclick="changeQuantity(${item.id}, -1)"
            aria-label="Decrease quantity"
          >−</button>

          <span>${item.quantity}</span>

          <button
            type="button"
            onclick="changeQuantity(${item.id}, 1)"
            aria-label="Increase quantity"
          >+</button>
        </div>
      </div>

      <button
        class="remove-item"
        type="button"
        onclick="removeFromCart(${item.id})"
        aria-label="Remove ${item.name}"
      >×</button>
    </div>
  `).join("");

  setImageFallbacks(items);
}

/* ==========================================
   CART DRAWER
   ========================================== */

function openCart() {
  $("cartOverlay")?.classList.add("active");
  $("cartDrawer")?.classList.add("active");

  document.body.style.overflow = "hidden";
}

function closeCart() {
  $("cartOverlay")?.classList.remove("active");
  $("cartDrawer")?.classList.remove("active");

  document.body.style.overflow = "";
}

/* ==========================================
   QUICK VIEW
   ========================================== */

function openQuickView(id) {
  const product = products.find(item => item.id === id);
  const modal = $("productModal");
  const content = $("productModalContent");

  if (!product || !modal || !content) return;

  content.innerHTML = `
    <div class="quick-view-content">
      <img
        src="${product.image}"
        alt="${product.name}"
        data-fallback
      >

      <div>
        <span class="product-category">${product.category}</span>
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p class="quick-price">${formatPrice(product.price)}</p>

        <button
          class="add-button"
          type="button"
          onclick="addToCart(${product.id}); closeProductModal();"
        >
          ADD TO BAG
        </button>
      </div>
    </div>
  `;

  setImageFallbacks(content);

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeProductModal() {
  $("productModal")?.classList.remove("active");
  document.body.style.overflow = "";
}

/* ==========================================
   WHATSAPP CHECKOUT
   ========================================== */

function openCheckout() {
  if (!cart.length) {
    showNotice("Your shopping bag is empty.");
    return;
  }

  closeCart();

  $("checkoutModal")?.classList.add("active");

  document.body.style.overflow = "hidden";

  if ($("checkoutTotal")) {
    $("checkoutTotal").textContent = formatPrice(getCartTotal());
  }
}

function closeCheckout() {
  $("checkoutModal")?.classList.remove("active");
  document.body.style.overflow = "";
}

function setupCheckout() {
  const form = $("checkoutForm");

  if (!form) return;

  form.addEventListener("submit", event => {
    event.preventDefault();

    if (!cart.length) {
      showNotice("Your shopping bag is empty.");
      return;
    }

    const name = $("customerName")?.value.trim();
    const phone = $("customerPhone")?.value.trim();
    const address = $("customerAddress")?.value.trim();
    const payment = $("paymentMethod")?.value;

    if (!name || !phone || !address || !payment) {
      showNotice("Please complete all checkout details.");
      return;
    }

    if (!/^[0-9+\s()-]{9,18}$/.test(phone)) {
      showNotice("Please enter a valid phone number.");
      return;
    }

    const orderLines = cart.map(item =>
      `${item.name} x ${item.quantity} — ${formatPrice(item.price * item.quantity)}`
    );

    const message = [
      `Hello ${STORE.name}, I would like to place an order.`,
      "",
      `Customer: ${name}`,
      `Phone: ${phone}`,
      `Delivery Address: ${address}`,
      `Payment Preference: ${payment}`,
      "",
      "ORDER DETAILS:",
      ...orderLines,
      "",
      `TOTAL: ${formatPrice(getCartTotal())}`,
      "",
      "Please confirm availability and delivery arrangements. Thank you."
    ].join("\n");

    const whatsappURL =
      `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  });
}

/* ==========================================
   MOBILE NAVIGATION
   ========================================== */

function setupMobileMenu() {
  const toggle = $("menuToggle");
  const nav = $("navLinks");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");

    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", event => {
    if (
      nav.classList.contains("open") &&
      !nav.contains(event.target) &&
      !toggle.contains(event.target)
    ) {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

/* ==========================================
   CONTINUE SHOPPING
   ========================================== */

function setupContinueShopping() {
  $("continueShopping")?.addEventListener("click", () => {
    closeCart();
    $("shop")?.scrollIntoView({ behavior: "smooth" });
  });
}

/* ==========================================
   WHATSAPP BUTTON
   ========================================== */

function setupWhatsApp() {
  const button = $("whatsappButton");

  if (!button) return;

  button.href = `https://wa.me/${STORE.whatsapp}`;
  button.target = "_blank";
  button.rel = "noopener noreferrer";
}

/* ==========================================
   IMAGE FALLBACKS
   ========================================== */

function setupStaticImageFallbacks() {
  document.querySelectorAll("img:not([data-fallback])").forEach(img => {
    if (img.dataset.staticFallbackReady) return;

    img.dataset.staticFallbackReady = "true";

    img.addEventListener("error", function () {
      this.onerror = null;
      this.src = FALLBACK_IMAGE;
    }, { once: true });
  });
}

/* ==========================================
   GENERAL EVENTS
   ========================================== */

function setupStoreEvents() {
  $("openCart")?.addEventListener("click", openCart);
  $("closeCart")?.addEventListener("click", closeCart);
  $("cartOverlay")?.addEventListener("click", closeCart);

  $("checkoutButton")?.addEventListener("click", openCheckout);

  $("closeProductModal")?.addEventListener(
    "click",
    closeProductModal
  );

  $("closeCheckout")?.addEventListener(
    "click",
    closeCheckout
  );

  $("productModal")?.addEventListener("click", event => {
    if (event.target.id === "productModal") {
      closeProductModal();
    }
  });

  $("checkoutModal")?.addEventListener("click", event => {
    if (event.target.id === "checkoutModal") {
      closeCheckout();
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeCart();
      closeProductModal();
      closeCheckout();
    }
  });
}

/* ==========================================
   FOOTER YEAR
   ========================================== */

function setupFooterYear() {
  if ($("year")) {
    $("year").textContent = new Date().getFullYear();
  }
}

/* ==========================================
   START CENT AFFAIR
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderCart();

  setupFilters();
  setupSearch();
  setupCollections();

  setupCheckout();
  setupMobileMenu();
  setupContinueShopping();
  setupWhatsApp();

  setupStoreEvents();
  setupFooterYear();

  setupStaticImageFallbacks();
  setImageFallbacks();

  console.log("CENT AFFAIR — The Art of Fragrance — Ready.");
});
