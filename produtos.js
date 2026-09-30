(() => {
  // ============================================================
  // CONFIGURAÇÃO
  // Inserir o número oficial quando for validado.
  // Exemplo: 5511999999999
  // ============================================================
  const WHATSAPP_NUMBER = "";

  // Itens DEMONSTRATIVOS para validar a experiência.
  // Não representam estoque real, preço ou compatibilidade confirmada.
  const PRODUCTS = [
    {
      id: "pastilha-freio",
      name: "Pastilha de freio",
      category: "Freios",
      description: "Item demonstrativo para consulta de aplicação e disponibilidade.",
      icon: "brake"
    },
    {
      id: "disco-freio",
      name: "Disco de freio",
      category: "Freios",
      description: "Selecione para solicitar confirmação de modelo compatível.",
      icon: "disc"
    },
    {
      id: "bateria",
      name: "Bateria automotiva",
      category: "Elétrica",
      description: "Capacidade e aplicação precisam ser conferidas pelo veículo.",
      icon: "battery"
    },
    {
      id: "lampada",
      name: "Lâmpada automotiva",
      category: "Elétrica",
      description: "Consulte tipo, encaixe e aplicação compatível com seu carro.",
      icon: "lamp"
    },
    {
      id: "filtro-oleo",
      name: "Filtro de óleo",
      category: "Filtros",
      description: "Item ilustrativo. Aplicação confirmada conforme motor e versão.",
      icon: "filter"
    },
    {
      id: "filtro-ar",
      name: "Filtro de ar",
      category: "Filtros",
      description: "Consulte disponibilidade e referência correta para o veículo.",
      icon: "air"
    },
    {
      id: "palheta",
      name: "Palheta do limpador",
      category: "Acessórios",
      description: "Comprimento e encaixe devem ser confirmados antes do pedido.",
      icon: "wiper"
    },
    {
      id: "amortecedor",
      name: "Amortecedor",
      category: "Suspensão",
      description: "Dianteiro ou traseiro, lado e aplicação são confirmados no atendimento.",
      icon: "shock"
    },
    {
      id: "vela",
      name: "Vela de ignição",
      category: "Motor",
      description: "Código correto depende da motorização e especificação do veículo.",
      icon: "spark"
    }
  ];

  const ICONS = {
    brake: '<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="21"/><circle cx="32" cy="32" r="6"/><path d="M46 17c6 4 9 9 10 15M19 48c-5-4-8-9-9-15"/><path d="M48 28h8v12h-8"/></svg>',
    disc: '<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="22"/><circle cx="32" cy="32" r="8"/><circle cx="32" cy="32" r="2"/><path d="M32 10v7M32 47v7M10 32h7M47 32h7"/></svg>',
    battery: '<svg viewBox="0 0 64 64"><rect x="10" y="19" width="44" height="31" rx="4"/><path d="M18 19v-5h9v5M38 19v-5h9v5M19 34h10M24 29v10M39 34h10"/></svg>',
    lamp: '<svg viewBox="0 0 64 64"><path d="M21 35c-4-4-6-9-6-14 0-10 8-18 18-18s18 8 18 18c0 6-3 11-7 15-3 3-5 6-5 10H26c0-4-2-8-5-11Z"/><path d="M25 47h15M27 53h11"/></svg>',
    filter: '<svg viewBox="0 0 64 64"><path d="M17 13h30l5 10-5 28H17l-5-28 5-10Z"/><path d="M14 23h36M22 23v28M31 23v28M40 23v28"/></svg>',
    air: '<svg viewBox="0 0 64 64"><rect x="13" y="15" width="38" height="34" rx="4"/><path d="M19 21h26M19 28h26M19 35h26M19 42h26"/></svg>',
    wiper: '<svg viewBox="0 0 64 64"><path d="M9 43c13-17 31-27 46-27"/><path d="M15 45 52 19M20 49h34"/></svg>',
    shock: '<svg viewBox="0 0 64 64"><path d="M27 8h10M32 8v10M24 18h16v8H24zM28 26h8v21h-8zM24 47h16v8H24zM32 55v4"/></svg>',
    spark: '<svg viewBox="0 0 64 64"><path d="M24 7h16v9H24zM27 16h10v9H27zM24 25h16l-4 14h-8l-4-14Z"/><path d="M32 39v10M27 49h10M29 55h6"/></svg>'
  };

  const grid = document.getElementById("product-grid");
  const categoryFilter = document.getElementById("category-filter");
  const search = document.getElementById("product-search");
  const resultCount = document.getElementById("product-result-count");
  const emptyState = document.getElementById("empty-state");
  const cartTrigger = document.getElementById("cart-trigger");
  const cartDrawer = document.getElementById("cart-drawer");
  const cartOverlay = document.getElementById("cart-overlay");
  const cartClose = document.getElementById("cart-close");
  const cartItems = document.getElementById("cart-items");
  const cartEmpty = document.getElementById("cart-empty");
  const cartCount = document.getElementById("cart-count");
  const cartTotalItems = document.getElementById("cart-total-items");
  const cartWhatsapp = document.getElementById("cart-whatsapp");
  const whatsappStatus = document.getElementById("whatsapp-status");
  const toast = document.getElementById("toast");
  const year = document.getElementById("current-year");
  const menuButton = document.querySelector(".catalog-menu-button");
  const menu = document.querySelector(".catalog-menu");

  const vehicleFields = {
    brand: document.getElementById("vehicle-brand"),
    model: document.getElementById("vehicle-model"),
    year: document.getElementById("vehicle-year"),
    version: document.getElementById("vehicle-version")
  };

  if (year) year.textContent = new Date().getFullYear();

  let activeCategory = "Todos";
  let query = "";
  let cart = loadCart();

  function loadCart() {
    try {
      return JSON.parse(localStorage.getItem("rustcar-cart") || "{}");
    } catch {
      return {};
    }
  }

  function saveCart() {
    localStorage.setItem("rustcar-cart", JSON.stringify(cart));
  }

  function totalQuantity() {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  }

  function productById(id) {
    return PRODUCTS.find((product) => product.id === id);
  }

  function categories() {
    return ["Todos", ...new Set(PRODUCTS.map((p) => p.category))];
  }

  function renderCategories() {
    categoryFilter.innerHTML = categories().map((category) => `
      <button class="category-chip ${category === activeCategory ? "is-active" : ""}" type="button" data-category="${category}">
        ${category}
      </button>
    `).join("");

    categoryFilter.querySelectorAll("[data-category]").forEach((button) => {
      button.addEventListener("click", () => {
        activeCategory = button.dataset.category;
        renderCategories();
        renderProducts();
      });
    });
  }

  function filteredProducts() {
    const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");
    return PRODUCTS.filter((product) => {
      const categoryMatches = activeCategory === "Todos" || product.category === activeCategory;
      const searchMatches = !normalizedQuery ||
        product.name.toLocaleLowerCase("pt-BR").includes(normalizedQuery) ||
        product.category.toLocaleLowerCase("pt-BR").includes(normalizedQuery) ||
        product.description.toLocaleLowerCase("pt-BR").includes(normalizedQuery);
      return categoryMatches && searchMatches;
    });
  }

  function renderProducts() {
    const list = filteredProducts();
    resultCount.textContent = `${list.length} ${list.length === 1 ? "item" : "itens"}`;
    emptyState.hidden = list.length !== 0;

    grid.innerHTML = list.map((product) => {
      const isAdded = Boolean(cart[product.id]);
      return `
        <article class="product-card">
          <span class="product-badge">Demonstração</span>
          <div class="product-visual">${ICONS[product.icon]}</div>
          <div class="product-body">
            <p class="product-category">${product.category}</p>
            <h3>${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-meta">
              <div class="product-price">
                <small>Preço</small>
                <strong>Sob consulta</strong>
              </div>
              <button class="add-cart-button ${isAdded ? "is-added" : ""}" type="button" data-add="${product.id}">
                ${isAdded ? "Adicionar mais" : "Adicionar"}
              </button>
            </div>
          </div>
        </article>
      `;
    }).join("");

    grid.querySelectorAll("[data-add]").forEach((button) => {
      button.addEventListener("click", () => addToCart(button.dataset.add));
    });
  }

  function addToCart(id) {
    cart[id] = (cart[id] || 0) + 1;
    saveCart();
    renderProducts();
    renderCart();
    showToast("Item adicionado ao carrinho.");
  }

  function changeQuantity(id, delta) {
    const next = (cart[id] || 0) + delta;
    if (next <= 0) delete cart[id];
    else cart[id] = next;
    saveCart();
    renderProducts();
    renderCart();
  }

  function removeItem(id) {
    delete cart[id];
    saveCart();
    renderProducts();
    renderCart();
  }

  function renderCart() {
    const entries = Object.entries(cart).filter(([, qty]) => qty > 0);
    const quantity = totalQuantity();

    cartCount.textContent = quantity;
    cartTotalItems.textContent = quantity;
    cartEmpty.hidden = entries.length !== 0;
    cartWhatsapp.disabled = entries.length === 0;

    cartItems.innerHTML = entries.map(([id, qty]) => {
      const product = productById(id);
      if (!product) return "";
      return `
        <article class="cart-item">
          <div class="cart-item-icon">${ICONS[product.icon]}</div>
          <div>
            <strong>${product.name}</strong>
            <small>${product.category} • preço sob consulta</small>
            <div class="cart-qty">
              <button type="button" data-minus="${id}" aria-label="Diminuir quantidade">−</button>
              <span>${qty}</span>
              <button type="button" data-plus="${id}" aria-label="Aumentar quantidade">+</button>
            </div>
          </div>
          <button class="cart-remove" type="button" data-remove="${id}">Remover</button>
        </article>
      `;
    }).join("");

    cartItems.querySelectorAll("[data-minus]").forEach((button) => {
      button.addEventListener("click", () => changeQuantity(button.dataset.minus, -1));
    });
    cartItems.querySelectorAll("[data-plus]").forEach((button) => {
      button.addEventListener("click", () => changeQuantity(button.dataset.plus, 1));
    });
    cartItems.querySelectorAll("[data-remove]").forEach((button) => {
      button.addEventListener("click", () => removeItem(button.dataset.remove));
    });
  }

  function openCart() {
    cartDrawer.classList.add("is-open");
    cartDrawer.setAttribute("aria-hidden", "false");
    cartOverlay.hidden = false;
    document.body.classList.add("cart-open");
  }

  function closeCart() {
    cartDrawer.classList.remove("is-open");
    cartDrawer.setAttribute("aria-hidden", "true");
    cartOverlay.hidden = true;
    document.body.classList.remove("cart-open");
  }

  function buildWhatsappMessage() {
    const entries = Object.entries(cart).filter(([, qty]) => qty > 0);
    const items = entries.map(([id, qty]) => {
      const product = productById(id);
      return `• ${qty}x ${product?.name || id}`;
    }).join("\n");

    const vehicle = [
      vehicleFields.brand.value.trim(),
      vehicleFields.model.value.trim(),
      vehicleFields.year.value.trim(),
      vehicleFields.version.value.trim()
    ].filter(Boolean).join(" • ");

    return [
      "Olá! Vim pelo site da Rust Car e gostaria de consultar os itens abaixo:",
      "",
      items,
      "",
      vehicle ? `Veículo: ${vehicle}` : "Veículo: ainda não informado",
      "",
      "Podem confirmar disponibilidade, compatibilidade e valores?"
    ].join("\n");
  }

  function sendWhatsapp() {
    if (!totalQuantity()) return;

    const number = String(WHATSAPP_NUMBER).replace(/\D/g, "");
    if (!number) {
      whatsappStatus.hidden = false;
      showToast("Carrinho pronto. Falta apenas conectar o WhatsApp oficial.");
      return;
    }

    const url = `https://wa.me/${number}?text=${encodeURIComponent(buildWhatsappMessage())}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("is-visible"), 2200);
  }

  search.addEventListener("input", () => {
    query = search.value;
    renderProducts();
  });

  cartTrigger.addEventListener("click", openCart);
  cartClose.addEventListener("click", closeCart);
  cartOverlay.addEventListener("click", closeCart);
  cartWhatsapp.addEventListener("click", sendWhatsapp);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeCart();
  });

  if (menuButton && menu) {
    menuButton.addEventListener("click", () => {
      const open = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!open));
      menu.classList.toggle("is-open", !open);
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuButton.setAttribute("aria-expanded", "false");
        menu.classList.remove("is-open");
      });
    });
  }

  document.querySelectorAll(".js-catalog-whatsapp").forEach((link) => {
    link.addEventListener("click", (event) => {
      const number = String(WHATSAPP_NUMBER).replace(/\D/g, "");
      if (!number) return;
      event.preventDefault();
      window.open(
        `https://wa.me/${number}?text=${encodeURIComponent("Olá! Vim pelo site da Rust Car e gostaria de consultar uma peça ou acessório.")}`,
        "_blank",
        "noopener,noreferrer"
      );
    });
  });

  renderCategories();
  renderProducts();
  renderCart();
})();