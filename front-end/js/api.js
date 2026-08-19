const TOKEN_STORAGE_KEY = "tienda_api_token";

function getToken() {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

function setToken(token) {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
}

function clearToken() {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
}

/**
 * Wrapper de fetch() que agrega el header Authorization con el Bearer token
 * guardado en localStorage y normaliza los errores de la API en un Error
 * con un mensaje legible para mostrar en pantalla.
 */
async function apiFetch(path, options = {}) {
  const headers = Object.assign(
    { "Content-Type": "application/json" },
    options.headers || {}
  );

  const token = getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers,
    });
  } catch (networkError) {
    throw new Error(
      "No se pudo conectar con la API. Verificá que el servidor Flask esté corriendo."
    );
  }

  let body = null;
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    body = await response.json().catch(() => null);
  }

  if (!response.ok) {
    const message =
      (body && (body.errores || body.error)) ||
      `Error ${response.status} al llamar a la API`;
    throw new Error(message);
  }

  return body;
}

const api = {
  get: (path) => apiFetch(path, { method: "GET" }),
  post: (path, data) => apiFetch(path, { method: "POST", body: JSON.stringify(data) }),
  put: (path, data) => apiFetch(path, { method: "PUT", body: JSON.stringify(data) }),
  delete: (path) => apiFetch(path, { method: "DELETE" }),
};
