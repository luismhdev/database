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

## Integrantes

- **Luis Angel Matarrita Hernandez**
- **Nicole Angulo Segura**
