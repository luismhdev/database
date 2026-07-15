# Tienda de Ropa — Base de Datos MongoDB

Proyecto universitario que implementa una base de datos no relacional en MongoDB para gestionar una tienda de ropa. Incluye colecciones de usuarios, marcas, prendas y ventas, con datos embebidos para optimizar las consultas sin depender de joins relacionales.

## Tecnologías utilizadas

- **MongoDB** — Motor de base de datos NoSQL
- **mongosh** — Shell oficial de MongoDB para ejecutar el script
- **GitHub** — Control de versiones y colaboración

## Cómo ejecutar

```bash
mongosh database/database.js
```

---

## Estructura de la base de datos

### Colección: `marcas`

Almacena información de cada marca de ropa disponible en la tienda.

```json
{
  "nombre": "Nike",
  "pais": "Estados Unidos",
  "descripcion": "Marca líder mundial en ropa y calzado deportivo.",
  "añoFundacion": 1964,
  "sitioWeb": "https://www.nike.com",
  "categorias": ["deportiva", "casual", "running"]
}
```

---

### Colección: `usuarios`

Almacena los datos de los clientes registrados en la tienda.

```json
{
  "nombre": "Andrés",
  "apellido": "Mora Solano",
  "email": "andres.mora@gmail.com",
  "telefono": "8812-3456",
  "direccion": {
    "provincia": "San José",
    "canton": "Escazú",
    "distrito": "San Rafael"
  },
  "fechaRegistro": "2023-05-10T00:00:00.000Z",
  "activo": true
}
```

---

### Colección: `prendas`

Almacena el catálogo de prendas con información de la marca embebida. Los precios están en colones costarricenses (₡).

```json
{
  "nombre": "Camiseta Nike Dri-FIT",
  "descripcion": "Camiseta deportiva con tecnología Dri-FIT para mantenerte seco durante el ejercicio.",
  "marca": {
    "nombre": "Nike",
    "pais": "Estados Unidos"
  },
  "categoria": "Camiseta",
  "genero": "Masculino",
  "precio": 22500,
  "tallas": ["S", "M", "L", "XL"],
  "colores": ["Negro", "Blanco", "Azul"],
  "stock": 45
}
```

---

### Colección: `ventas`

Registra cada transacción con datos del usuario y la prenda embebidos directamente en el documento, para evitar consultas adicionales al momento de reportes.

```json
{
  "usuario": {
    "nombre": "Andrés",
    "apellido": "Mora Solano",
    "email": "andres.mora@gmail.com"
  },
  "prenda": {
    "nombre": "Camiseta Nike Dri-FIT",
    "marca": "Nike",
    "categoria": "Camiseta",
    "talla": "M",
    "color": "Negro",
    "precioUnitario": 22500
  },
  "cantidad": 2,
  "total": 45000,
  "fecha": "2024-03-15T00:00:00.000Z",
  "estado": "Completada"
}
```

---

## Consultas implementadas

| # | Descripción |
|---|-------------|
| 1 | Cantidad vendida de prendas por fecha, filtrada por una fecha específica |
| 2 | Lista de todas las marcas que tienen al menos una venta |
| 3 | Prendas vendidas y su cantidad restante en stock |
| 4 | Top 5 marcas más vendidas con su cantidad de ventas |

---

## API

Parte 2 del proyecto: una API REST en Python (Flask + PyMongo) que expone la base de datos `tienda_ropa` vía HTTP. El código vive en `api/v1/`.

### Estructura

```
api/
  v1/
    .env.example
    run.py
    app/
      index.py
      __init__.py
      auth.py
      controllers/
        usuarios.py
        marcas.py
        prendas.py
        ventas.py
        reportes.py
      models/
        usuario.py
        marca.py
        prenda.py
        venta.py
```

Cada colección tiene su propio modelo (maneja la conexión y las queries a MongoDB con PyMongo) y su propio controlador (maneja la lógica de los endpoints con Flask). Los reportes agregan datos entre colecciones y viven en `controllers/reportes.py`. `auth.py` contiene el middleware de autenticación por Bearer token.

### Configuración

La API lee su configuración desde un archivo `.env` (no se sube al repo, está en `.gitignore`) ubicado en `api/v1/`. Creá el tuyo a partir de `api/v1/.env.example`:

```bash
cd api/v1
cp .env.example .env
```

Y completá las variables:

```
MONGO_URI=mongodb://localhost:27017/tienda_ropa
API_TOKEN=elige-un-valor-secreto-cualquiera
```

- `MONGO_URI`: cadena de conexión completa a MongoDB, incluyendo la base de datos (`tienda_ropa`).
- `API_TOKEN`: el valor fijo que la API espera recibir como Bearer token en cada request (ver sección de autenticación más abajo).

### Cómo ejecutar

```bash
cd api/v1
pip install flask pymongo python-dotenv
python run.py
```

El servidor corre en `http://127.0.0.1:5000`. Requiere que `mongod` esté activo, la base `tienda_ropa` cargada (ver sección "Cómo ejecutar" arriba) y el archivo `.env` configurado.

Todos los endpoints de obtener por id, actualizar y eliminar reciben el `id` del documento como query param (`?id=...`), no como parte de la ruta.

### Autenticación

Todos los endpoints (CRUD de usuarios, marcas, prendas, ventas y los 3 reportes) requieren un header `Authorization` con un Bearer token válido:

```
Authorization: Bearer <API_TOKEN>
```

Donde `<API_TOKEN>` es el valor configurado en `.env`. Si el header falta, está mal formado, o el token no coincide, la API responde `401` con:

```json
{ "errores": "token no valido" }
```

### Usuarios

Obtener todos los usuarios
- Método: GET
- URL: http://127.0.0.1:5000/tienda/api/v1/usuarios

Obtener usuario por id
- Método: GET
- URL: http://127.0.0.1:5000/tienda/api/v1/usuarios?id=665f1a2b3c4d5e6f7a8b9c0d

Crear usuario
- Método: POST
- URL: http://127.0.0.1:5000/tienda/api/v1/usuarios
- Body:
```json
{
  "nombre": "Andrés",
  "apellido": "Mora Solano",
  "email": "andres.mora@gmail.com",
  "telefono": "8812-3456",
  "direccion": {
    "provincia": "San José",
    "canton": "Escazú",
    "distrito": "San Rafael"
  },
  "activo": true
}
```

Actualizar usuario
- Método: PUT
- URL: http://127.0.0.1:5000/tienda/api/v1/usuarios?id=665f1a2b3c4d5e6f7a8b9c0d
- Body:
```json
{
  "telefono": "8899-0000",
  "activo": false
}
```

Eliminar usuario
- Método: DELETE
- URL: http://127.0.0.1:5000/tienda/api/v1/usuarios?id=665f1a2b3c4d5e6f7a8b9c0d

### Marcas

Obtener todas las marcas
- Método: GET
- URL: http://127.0.0.1:5000/tienda/api/v1/marcas

Obtener marca por id
- Método: GET
- URL: http://127.0.0.1:5000/tienda/api/v1/marcas?id=665f1a2b3c4d5e6f7a8b9c0d

Crear marca
- Método: POST
- URL: http://127.0.0.1:5000/tienda/api/v1/marcas
- Body:
```json
{
  "nombre": "Puma",
  "pais": "Alemania",
  "descripcion": "Marca deportiva alemana con enfoque en fútbol y running.",
  "añoFundacion": 1948,
  "sitioWeb": "https://www.puma.com",
  "categorias": ["deportiva", "casual"]
}
```

Actualizar marca
- Método: PUT
- URL: http://127.0.0.1:5000/tienda/api/v1/marcas?id=665f1a2b3c4d5e6f7a8b9c0d
- Body:
```json
{
  "descripcion": "Descripción actualizada de la marca."
}
```

Eliminar marca
- Método: DELETE
- URL: http://127.0.0.1:5000/tienda/api/v1/marcas?id=665f1a2b3c4d5e6f7a8b9c0d

### Prendas

Obtener todas las prendas
- Método: GET
- URL: http://127.0.0.1:5000/tienda/api/v1/prendas

Obtener prenda por id
- Método: GET
- URL: http://127.0.0.1:5000/tienda/api/v1/prendas?id=665f1a2b3c4d5e6f7a8b9c0d

Crear prenda
- Método: POST
- URL: http://127.0.0.1:5000/tienda/api/v1/prendas
- Body:
```json
{
  "nombre": "Gorra Nike Classic99",
  "descripcion": "Gorra ajustable con logo bordado.",
  "marca": {
    "nombre": "Nike",
    "pais": "Estados Unidos"
  },
  "categoria": "Gorra",
  "genero": "Unisex",
  "precio": 9500,
  "tallas": ["Única"],
  "colores": ["Negro", "Blanco"],
  "stock": 20
}
```

Actualizar prenda
- Método: PUT
- URL: http://127.0.0.1:5000/tienda/api/v1/prendas?id=665f1a2b3c4d5e6f7a8b9c0d
- Body:
```json
{
  "precio": 8900,
  "stock": 15
}
```

Eliminar prenda
- Método: DELETE
- URL: http://127.0.0.1:5000/tienda/api/v1/prendas?id=665f1a2b3c4d5e6f7a8b9c0d

### Ventas

Obtener todas las ventas
- Método: GET
- URL: http://127.0.0.1:5000/tienda/api/v1/ventas

Obtener venta por id
- Método: GET
- URL: http://127.0.0.1:5000/tienda/api/v1/ventas?id=665f1a2b3c4d5e6f7a8b9c0d

Crear venta
- Método: POST
- URL: http://127.0.0.1:5000/tienda/api/v1/ventas
- Body:
```json
{
  "usuario": {
    "nombre": "Andrés",
    "apellido": "Mora Solano",
    "email": "andres.mora@gmail.com"
  },
  "prenda": {
    "nombre": "Camiseta Nike Dri-FIT",
    "marca": "Nike",
    "categoria": "Camiseta",
    "talla": "M",
    "color": "Negro",
    "precioUnitario": 22500
  },
  "cantidad": 1,
  "total": 22500,
  "fecha": "2024-06-01T00:00:00.000Z",
  "estado": "Completada"
}
```

Actualizar venta
- Método: PUT
- URL: http://127.0.0.1:5000/tienda/api/v1/ventas?id=665f1a2b3c4d5e6f7a8b9c0d
- Body:
```json
{
  "estado": "Devuelta"
}
```

Eliminar venta
- Método: DELETE
- URL: http://127.0.0.1:5000/tienda/api/v1/ventas?id=665f1a2b3c4d5e6f7a8b9c0d

### Reportes

Marcas con al menos una venta
- Método: GET
- URL: http://127.0.0.1:5000/tienda/api/v1/reportes/marcas-con-ventas

Prendas vendidas y su cantidad restante en stock
- Método: GET
- URL: http://127.0.0.1:5000/tienda/api/v1/reportes/prendas-stock

Top 5 marcas más vendidas con su cantidad de ventas
- Método: GET
- URL: http://127.0.0.1:5000/tienda/api/v1/reportes/top-marcas

---

## Integrantes

- **Luis Angel Matarrita Hernandez**
- **Nicole Angulo Segura**


## Cómo ejecutar

### Requisitos
- MongoDB 8.0+
- mongosh

### 1. Cargar la base de datos
```bash
mongosh database/database.js
```

### 2. Consultar datos manualmente
```bash
mongosh
```
Una vez dentro de mongosh:
```js
use tienda_ropa

// Ver todas las ventas
db.ventas.find().pretty()

// Ver todas las marcas
db.marcas.find().pretty()

// Ver todas las prendas
db.prendas.find().pretty()

// Ver todos los usuarios
db.usuarios.find().pretty()
```

### 3. Ver datos visualmente con MongoDB Compass
- Abrí MongoDB Compass
- En el campo URI ingresá: `mongodb://localhost:27017`
- Clic en **Connect**
- En el panel izquierdo abrí **tienda_ropa**
- Entrá a cada colección para ver los documentos
