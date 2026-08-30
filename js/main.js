/**
 * ==========================================================
 *  الملف الرئيسي للتفاعل - لا حاجة لتعديله عادة
 * ==========================================================
 */

const CATEGORY_LABELS = {
  all: "الكل",
  kids: "ملابس الأطفال",
  women: "الملابس النسائية",
  burqa: "البراقع",
  women_products: "مسلتزات نسائيه",
  incense_fragrances: "الدخون والمعطرات",
  prayer: "جلال الصلاة",
  other: "منتجات أخرى",
};

let activeCategory = "all";

/* ---------- روابط واتساب ---------- */
function buildWhatsappLink(message) {
  const number = STORE_CONFIG.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

function buildProductWhatsappLink(productName) {
  const message = STORE_CONFIG.productWhatsappMessageTemplate.replace("{product}", productName);
  return buildWhatsappLink(message);
}

function applyGeneralWhatsappLinks() {
  const links = document.querySelectorAll("[data-whatsapp-general]");
  const url = buildWhatsappLink(STORE_CONFIG.generalWhatsappMessage);
  links.forEach((link) => {
    link.href = url;
  });
}

/* ---------- تعبئة بيانات المتجر في القالب ---------- */
function applyStoreConfig() {
  document.title = `${STORE_CONFIG.storeName} | ${STORE_CONFIG.storeTagline}`;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", STORE_CONFIG.seoDescription);

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute("content", STORE_CONFIG.storeName);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute("content", STORE_CONFIG.seoDescription);

  document.querySelectorAll("[data-store-name]").forEach((el) => {
    el.textContent = STORE_CONFIG.storeName;
  });

  document.querySelectorAll("[data-store-tagline]").forEach((el) => {
    if (!STORE_CONFIG.storeTagline) {
      el.style.display = "none";
    } else {
      el.textContent = STORE_CONFIG.storeTagline;
    }
  });

  document.querySelectorAll("[data-store-about]").forEach((el) => {
    el.textContent = STORE_CONFIG.aboutText;
  });

  document.querySelectorAll("[data-store-city]").forEach((el) => {
    if (!STORE_CONFIG.city) {
      el.style.display = "none";
    } else {
      el.textContent = STORE_CONFIG.city;
    }
  });

  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const footerNoteEl = document.querySelector("[data-footer-note]");
  if (footerNoteEl) footerNoteEl.textContent = STORE_CONFIG.footerNote;
}

/* ---------- بطاقة منتج ---------- */
function formatPrice(product) {
  if (product.price === null || product.price === undefined || product.price === "") {
    return `<span class="product-price is-onrequest">السعر عند الطلب</span>`;
  }
  return `<span class="product-price">${product.price} ريال</span>`;
}

function productMediaMarkup(product, isLightbox) {
  const iconClass = isLightbox ? "lightbox-media-icon" : "product-media-icon";
  if (product.image) {
    return `<img src="${product.image}" alt="${product.name}" loading="${
      isLightbox ? "eager" : "lazy"
    }" onerror="this.parentElement.innerHTML = window.__fallbackMedia('${product.category}', '${iconClass}');" />`;
  }
  return fallbackMediaMarkup(product.category, iconClass);
}

function fallbackMediaMarkup(category, iconClass) {
  const icon = CATEGORY_ICONS[category] || CATEGORY_ICONS.other;
  return `<span class="${iconClass}">${icon}</span>
    ${
      iconClass === "product-media-icon"
        ? '<span class="product-media-placeholder-label">صورة المنتج قريبًا</span>'
        : ""
    }`;
}

// يُستخدم كخطة بديلة إذا تعذر تحميل صورة حقيقية موضوعة في image
window.__fallbackMedia = fallbackMediaMarkup;

function renderProductCard(product, index) {
  const card = document.createElement("article");
  card.className = "product-card";
  card.style.animationDelay = `${Math.min(index, 8) * 0.05}s`;
  card.dataset.id = product.id;

  card.innerHTML = `
    <div class="product-media" data-open-lightbox tabindex="0" role="button"
         aria-label="تكبير صورة ${product.name}">
      ${productMediaMarkup(product, false)}
      ${!product.available ? '<span class="product-unavailable-tag">غير متوفر حاليًا</span>' : ""}
    </div>
    <div class="product-body">
      <span class="product-category-tag">${CATEGORY_LABELS[product.category] || ""}</span>
      <h3 class="product-name">${product.name}</h3>
      ${product.description ? `<p class="product-desc">${product.description}</p>` : ""}
      <div class="product-footer">
        ${formatPrice(product)}
        <a class="btn btn-whatsapp btn-sm" target="_blank" rel="noopener"
           href="${buildProductWhatsappLink(product.name)}">
          ${whatsappIconSvg()} استفسري
        </a>
      </div>
    </div>
  `;

  card.querySelector("[data-open-lightbox]").addEventListener("click", () => openLightbox(product));
  card.querySelector("[data-open-lightbox]").addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openLightbox(product);
    }
  });

  return card;
}

function whatsappIconSvg() {
  return `<svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16.02 3C9.4 3 4 8.38 4 15c0 2.34.65 4.53 1.78 6.4L4 29l7.8-1.74A11.94 11.94 0 0 0 16.02 27C22.65 27 28 21.62 28 15S22.65 3 16.02 3Zm0 21.7c-1.98 0-3.83-.55-5.4-1.5l-.39-.23-4.62 1.03 1.03-4.5-.25-.4A9.63 9.63 0 0 1 6.3 15c0-5.36 4.37-9.71 9.72-9.71 5.36 0 9.71 4.35 9.71 9.71 0 5.36-4.35 9.7-9.71 9.7Zm5.32-7.27c-.29-.15-1.72-.85-1.99-.95-.27-.1-.46-.15-.66.15-.2.29-.75.95-.92 1.15-.17.2-.34.22-.63.07-.29-.15-1.22-.45-2.32-1.43-.86-.77-1.44-1.71-1.61-2-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.07-.15-.66-1.59-.9-2.18-.24-.57-.48-.49-.66-.5h-.56c-.2 0-.51.07-.78.37-.27.29-1.02 1-1.02 2.44s1.05 2.83 1.19 3.03c.15.2 2.07 3.16 5.02 4.43.7.3 1.25.48 1.68.62.71.22 1.35.19 1.86.12.57-.09 1.72-.7 1.96-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.34Z"/></svg>`;
}

/* ---------- عرض المنتجات ---------- */
function renderProducts() {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";

  const filtered =
    activeCategory === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  if (filtered.length === 0) {
    grid.innerHTML = `<p class="empty-state">لا توجد منتجات في هذا التصنيف حاليًا، تابعينا قريبًا لإضافات جديدة.</p>`;
    return;
  }

  filtered.forEach((product, i) => grid.appendChild(renderProductCard(product, i)));
}

/* ---------- الفلاتر ---------- */
function initFilters() {
  const bar = document.getElementById("filterBar");
  bar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    bar.querySelectorAll(".filter-btn").forEach((b) => {
      b.classList.remove("is-active");
      b.setAttribute("aria-pressed", "false");
    });
    btn.classList.add("is-active");
    btn.setAttribute("aria-pressed", "true");
    activeCategory = btn.dataset.category;
    renderProducts();
  });
}

/* ---------- نافذة تكبير الصور ---------- */
let lastFocusedEl = null;

function openLightbox(product) {
  const lightbox = document.getElementById("lightbox");
  document.getElementById("lightboxMedia").innerHTML = productMediaMarkup(product, true);
  document.getElementById("lightboxName").textContent = product.name;
  document.getElementById("lightboxDesc").textContent = product.description || "";
  document.getElementById("lightboxWhatsapp").href = buildProductWhatsappLink(product.name);

  lastFocusedEl = document.activeElement;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.getElementById("lightboxClose").focus();
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (lastFocusedEl) lastFocusedEl.focus();
}

function initLightbox() {
  document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
  document.getElementById("lightbox").addEventListener("click", (e) => {
    if (e.target.id === "lightbox") closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
}

/* ---------- القائمة الجانبية للجوال ---------- */
function initNav() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");
  const closeBtn = document.getElementById("navClose");
  const scrim = document.getElementById("navScrim");

  function openNav() {
    nav.classList.add("is-open");
    scrim.classList.add("is-visible");
    document.body.classList.add("nav-open");
    toggle.setAttribute("aria-expanded", "true");
  }

  function closeNav() {
    nav.classList.remove("is-open");
    scrim.classList.remove("is-visible");
    document.body.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", openNav);
  closeBtn.addEventListener("click", closeNav);
  scrim.addEventListener("click", closeNav);
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNav));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNav();
  });
}

/* ---------- حركات الظهور عند التمرير ---------- */
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  items.forEach((el) => observer.observe(el));
}

/* ---------- التهيئة العامة ---------- */
document.addEventListener("DOMContentLoaded", () => {
  applyStoreConfig();
  applyGeneralWhatsappLinks();
  renderProducts();
  initFilters();
  initLightbox();
  initNav();
  initReveal();
});
