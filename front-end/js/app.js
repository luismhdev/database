const state = {
  prendas: [],
};

const el = {
  loginScreen: document.getElementById("login-screen"),
  loginForm: document.getElementById("login-form"),
  tokenInput: document.getElementById("token-input"),
  loginError: document.getElementById("login-error"),

  appScreen: document.getElementById("app-screen"),
  logoutBtn: document.getElementById("logout-btn"),
  errorBanner: document.getElementById("error-banner"),
  tabButtons: document.querySelectorAll(".tab-btn"),

  prendasTbody: document.getElementById("prendas-tbody"),
  btnNuevaPrenda: document.getElementById("btn-nueva-prenda"),

  prendaForm: document.getElementById("prenda-form"),
  prendaFormTitle: document.getElementById("prenda-form-title"),
  prendaId: document.getElementById("prenda-id"),
  prendaNombre: document.getElementById("prenda-nombre"),
  prendaDescripcion: document.getElementById("prenda-descripcion"),
  prendaMarcaNombre: document.getElementById("prenda-marca-nombre"),
  prendaMarcaPais: document.getElementById("prenda-marca-pais"),
  prendaCategoria: document.getElementById("prenda-categoria"),
  prendaGenero: document.getElementById("prenda-genero"),
  prendaPrecio: document.getElementById("prenda-precio"),
  prendaStock: document.getElementById("prenda-stock"),
  prendaTallas: document.getElementById("prenda-tallas"),
  prendaColores: document.getElementById("prenda-colores"),
  btnCancelarPrenda: document.getElementById("btn-cancelar-prenda"),

  marcasVentasTbody: document.getElementById("marcas-ventas-tbody"),
  prendasStockTbody: document.getElementById("prendas-stock-tbody"),
  topMarcasTbody: document.getElementById("top-marcas-tbody"),
};

const views = {
  prendas: document.getElementById("view-prendas"),
  "prenda-form": document.getElementById("view-prenda-form"),
  "marcas-ventas": document.getElementById("view-marcas-ventas"),
  "prendas-stock": document.getElementById("view-prendas-stock"),
  "top-marcas": document.getElementById("view-top-marcas"),
};

// ---------- Utilidades de UI ----------

function showError(message) {
  el.errorBanner.textContent = message;
  el.errorBanner.classList.remove("hidden");
}

function clearError() {
  el.errorBanner.classList.add("hidden");
  el.errorBanner.textContent = "";
}

function showView(name) {
  Object.entries(views).forEach(([key, section]) => {
    section.classList.toggle("hidden", key !== name);
  });

  el.tabButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.view === name);
  });
}

function escapeHtml(value) {
  if (value === undefined || value === null) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// ---------- Login / Logout ----------

el.loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  el.loginError.classList.add("hidden");

  const token = el.tokenInput.value.trim();
  if (!token) return;

  setToken(token);

  try {
    // Validamos el token contra un endpoint real antes de entrar al panel.
    await api.get("/prendas");
    el.loginScreen.classList.add("hidden");
    el.appScreen.classList.remove("hidden");
    clearError();
    showView("prendas");
    loadPrendas();
  } catch (err) {
    clearToken();
    el.loginError.textContent = err.message;
    el.loginError.classList.remove("hidden");
  }
});

el.logoutBtn.addEventListener("click", () => {
  clearToken();
  el.appScreen.classList.add("hidden");
  el.loginScreen.classList.remove("hidden");
  el.tokenInput.value = "";
  clearError();
});

// ---------- Navegación por tabs ----------

el.tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const view = btn.dataset.view;
    clearError();
    showView(view);

    if (view === "prendas") loadPrendas();
    if (view === "marcas-ventas") loadMarcasConVentas();
    if (view === "prendas-stock") loadPrendasStock();
    if (view === "top-marcas") loadTopMarcas();
  });
});

// ---------- CRUD de Prendas ----------

async function loadPrendas() {
  el.prendasTbody.innerHTML = `<tr><td colspan="9" class="empty-msg">Cargando prendas…</td></tr>`;
  try {
    const prendas = await api.get("/prendas");
    state.prendas = prendas;
    renderPrendas(prendas);
    clearError();
  } catch (err) {
    el.prendasTbody.innerHTML = `<tr><td colspan="9" class="empty-msg">No se pudieron cargar las prendas.</td></tr>`;
    showError(err.message);
  }
}

function renderPrendas(prendas) {
  if (!prendas.length) {
    el.prendasTbody.innerHTML = `<tr><td colspan="9" class="empty-msg">No hay prendas registradas.</td></tr>`;
    return;
  }

  el.prendasTbody.innerHTML = prendas
    .map((p) => {
      const marca = p.marca && p.marca.nombre ? p.marca.nombre : "—";
      const tallas = Array.isArray(p.tallas) ? p.tallas.join(", ") : "";
      const colores = Array.isArray(p.colores) ? p.colores.join(", ") : "";
      return `
        <tr>
          <td>${escapeHtml(p.nombre)}</td>
          <td>${escapeHtml(marca)}</td>
          <td>${escapeHtml(p.categoria)}</td>
          <td>${escapeHtml(p.genero)}</td>
          <td>${escapeHtml(p.precio)}</td>
          <td>${escapeHtml(p.stock)}</td>
          <td>${escapeHtml(tallas)}</td>
          <td>${escapeHtml(colores)}</td>
          <td>
            <button class="btn btn-secondary btn-small" data-action="edit" data-id="${p._id}">Editar</button>
            <button class="btn btn-danger btn-small" data-action="delete" data-id="${p._id}">Eliminar</button>
          </td>
        </tr>
      `;
    })
    .join("");
}

el.prendasTbody.addEventListener("click", (event) => {
  const btn = event.target.closest("button[data-action]");
  if (!btn) return;

  const id = btn.dataset.id;
  if (btn.dataset.action === "edit") {
    openPrendaForm(id);
  } else if (btn.dataset.action === "delete") {
    deletePrenda(id);
  }
});

function openPrendaForm(id) {
  el.prendaForm.reset();
  clearError();

  if (id) {
    const prenda = state.prendas.find((p) => p._id === id);
    if (!prenda) return;

    el.prendaFormTitle.textContent = "Editar prenda";
    el.prendaId.value = prenda._id;
    el.prendaNombre.value = prenda.nombre || "";
    el.prendaDescripcion.value = prenda.descripcion || "";
    el.prendaMarcaNombre.value = (prenda.marca && prenda.marca.nombre) || "";
    el.prendaMarcaPais.value = (prenda.marca && prenda.marca.pais) || "";
    el.prendaCategoria.value = prenda.categoria || "";
    el.prendaGenero.value = prenda.genero || "Unisex";
    el.prendaPrecio.value = prenda.precio ?? "";
    el.prendaStock.value = prenda.stock ?? "";
    el.prendaTallas.value = Array.isArray(prenda.tallas) ? prenda.tallas.join(", ") : "";
    el.prendaColores.value = Array.isArray(prenda.colores) ? prenda.colores.join(", ") : "";
  } else {
    el.prendaFormTitle.textContent = "Nueva prenda";
    el.prendaId.value = "";
  }

  showView("prenda-form");
}

el.btnNuevaPrenda.addEventListener("click", () => openPrendaForm(null));
el.btnCancelarPrenda.addEventListener("click", () => showView("prendas"));

function splitList(value) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

el.prendaForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const payload = {
    nombre: el.prendaNombre.value.trim(),
    descripcion: el.prendaDescripcion.value.trim(),
    marca: {
      nombre: el.prendaMarcaNombre.value.trim(),
      pais: el.prendaMarcaPais.value.trim(),
    },
    categoria: el.prendaCategoria.value.trim(),
    genero: el.prendaGenero.value,
    precio: Number(el.prendaPrecio.value),
    stock: Number(el.prendaStock.value),
    tallas: splitList(el.prendaTallas.value),
    colores: splitList(el.prendaColores.value),
  };

  const id = el.prendaId.value;

  try {
    if (id) {
      await api.put(`/prendas?id=${encodeURIComponent(id)}`, payload);
    } else {
      await api.post("/prendas", payload);
    }
    clearError();
    showView("prendas");
    loadPrendas();
  } catch (err) {
    showError(err.message);
  }
});

async function deletePrenda(id) {
  const prenda = state.prendas.find((p) => p._id === id);
  const nombre = prenda ? prenda.nombre : "esta prenda";
  if (!confirm(`¿Eliminar "${nombre}"? Esta acción no se puede deshacer.`)) return;

  try {
    await api.delete(`/prendas?id=${encodeURIComponent(id)}`);
    clearError();
    loadPrendas();
  } catch (err) {
    showError(err.message);
  }
}

// ---------- Reportes ----------

async function loadMarcasConVentas() {
  el.marcasVentasTbody.innerHTML = `<tr><td colspan="2" class="empty-msg">Cargando…</td></tr>`;
  try {
    const data = await api.get("/reportes/marcas-con-ventas");
    if (!data.length) {
      el.marcasVentasTbody.innerHTML = `<tr><td colspan="2" class="empty-msg">Sin datos.</td></tr>`;
      return;
    }
    el.marcasVentasTbody.innerHTML = data
      .map(
        (row) => `
          <tr>
            <td>${escapeHtml(row.marca)}</td>
            <td>${escapeHtml(row.totalTransacciones)}</td>
          </tr>
        `
      )
      .join("");
    clearError();
  } catch (err) {
    el.marcasVentasTbody.innerHTML = `<tr><td colspan="2" class="empty-msg">No se pudo cargar el reporte.</td></tr>`;
    showError(err.message);
  }
}

async function loadPrendasStock() {
  el.prendasStockTbody.innerHTML = `<tr><td colspan="5" class="empty-msg">Cargando…</td></tr>`;
  try {
    const data = await api.get("/reportes/prendas-stock");
    if (!data.length) {
      el.prendasStockTbody.innerHTML = `<tr><td colspan="5" class="empty-msg">Sin datos.</td></tr>`;
      return;
    }
    el.prendasStockTbody.innerHTML = data
      .map(
        (row) => `
          <tr>
            <td>${escapeHtml(row.prenda)}</td>
            <td>${escapeHtml(row.marca)}</td>
            <td>${escapeHtml(row.categoria)}</td>
            <td>${escapeHtml(row.stockActual)}</td>
            <td>${escapeHtml(row.totalVendido)}</td>
          </tr>
        `
      )
      .join("");
    clearError();
  } catch (err) {
    el.prendasStockTbody.innerHTML = `<tr><td colspan="5" class="empty-msg">No se pudo cargar el reporte.</td></tr>`;
    showError(err.message);
  }
}

async function loadTopMarcas() {
  el.topMarcasTbody.innerHTML = `<tr><td colspan="2" class="empty-msg">Cargando…</td></tr>`;
  try {
    const data = await api.get("/reportes/top-marcas");
    if (!data.length) {
      el.topMarcasTbody.innerHTML = `<tr><td colspan="2" class="empty-msg">Sin datos.</td></tr>`;
      return;
    }
    el.topMarcasTbody.innerHTML = data
      .map(
        (row) => `
          <tr>
            <td>${escapeHtml(row.marca)}</td>
            <td>${escapeHtml(row.totalUnidadesVendidas)}</td>
          </tr>
        `
      )
      .join("");
    clearError();
  } catch (err) {
    el.topMarcasTbody.innerHTML = `<tr><td colspan="2" class="empty-msg">No se pudo cargar el reporte.</td></tr>`;
    showError(err.message);
  }
}

// ---------- Arranque ----------

(function init() {
  if (getToken()) {
    el.loginScreen.classList.add("hidden");
    el.appScreen.classList.remove("hidden");
    showView("prendas");
    loadPrendas();
  }
})();
