// ============================================================
// Proyecto: Tienda de Ropa - Base de Datos MongoDB
// Archivo:  database/database.js
// Ejecutar: mongosh database.js
// ============================================================

use("tienda_ropa");

// ============================================================
// COLECCIÓN: marcas
// ============================================================

db.marcas.drop();

// Insertar una sola marca
db.marcas.insertOne({
  nombre: "Nike",
  pais: "Estados Unidos",
  descripcion: "Marca líder mundial en ropa y calzado deportivo.",
  añoFundacion: 1964,
  sitioWeb: "https://www.nike.com",
  categorias: ["deportiva", "casual", "running"]
});

// Insertar varias marcas
db.marcas.insertMany([
  {
    nombre: "Adidas",
    pais: "Alemania",
    descripcion: "Marca alemana reconocida mundialmente por su ropa deportiva y estilo urbano.",
    añoFundacion: 1949,
    sitioWeb: "https://www.adidas.com",
    categorias: ["deportiva", "casual", "streetwear"]
  },
  {
    nombre: "Zara",
    pais: "España",
    descripcion: "Cadena de moda rápida con diseños modernos y accesibles.",
    añoFundacion: 1975,
    sitioWeb: "https://www.zara.com",
    categorias: ["casual", "formal", "moda"]
  },
  {
    nombre: "H&M",
    pais: "Suecia",
    descripcion: "Tienda de moda accesible con amplia variedad de estilos.",
    añoFundacion: 1947,
    sitioWeb: "https://www.hm.com",
    categorias: ["casual", "básicos", "moda"]
  },
  {
    nombre: "Pull&Bear",
    pais: "España",
    descripcion: "Marca de moda joven con estilo urbano y precios accesibles.",
    añoFundacion: 1991,
    sitioWeb: "https://www.pullandbear.com",
    categorias: ["casual", "streetwear", "juvenil"]
  },
  {
    nombre: "Tommy Hilfiger",
    pais: "Estados Unidos",
    descripcion: "Marca de lujo accesible con estilo americano clásico.",
    añoFundacion: 1985,
    sitioWeb: "https://www.tommy.com",
    categorias: ["premium", "casual", "formal"]
  },
  {
    nombre: "Levi's",
    pais: "Estados Unidos",
    descripcion: "Marca icónica especializada en denim y ropa casual.",
    añoFundacion: 1853,
    sitioWeb: "https://www.levis.com",
    categorias: ["denim", "casual", "clásico"]
  }
]);

// Actualizar descripción de Pull&Bear
db.marcas.updateOne(
  { nombre: "Pull&Bear" },
  {
    $set: {
      descripcion:
        "Marca de moda joven y urbana, parte del grupo Inditex, con enfoque en el estilo streetwear contemporáneo."
    }
  }
);

// Eliminar marca de prueba (H&M)
db.marcas.deleteOne({ nombre: "H&M" });

// ============================================================
// COLECCIÓN: usuarios
// ============================================================

db.usuarios.drop();

// Insertar un solo usuario
db.usuarios.insertOne({
  nombre: "Andrés",
  apellido: "Mora Solano",
  email: "andres.mora@gmail.com",
  telefono: "8812-3456",
  direccion: {
    provincia: "San José",
    canton: "Escazú",
    distrito: "San Rafael"
  },
  fechaRegistro: new Date("2023-05-10"),
  activo: true
});

// Insertar varios usuarios
db.usuarios.insertMany([
  {
    nombre: "Valeria",
    apellido: "Jiménez Castro",
    email: "valeria.jimenez@hotmail.com",
    telefono: "7734-9021",
    direccion: {
      provincia: "Heredia",
      canton: "Heredia",
      distrito: "Mercedes"
    },
    fechaRegistro: new Date("2023-08-22"),
    activo: true
  },
  {
    nombre: "Carlos",
    apellido: "Rojas Ureña",
    email: "carlos.rojas@outlook.com",
    telefono: "6612-7845",
    direccion: {
      provincia: "Alajuela",
      canton: "San Ramón",
      distrito: "Santiago"
    },
    fechaRegistro: new Date("2024-01-14"),
    activo: true
  },
  {
    nombre: "María",
    apellido: "Vargas Quirós",
    email: "maria.vargas@gmail.com",
    telefono: "8945-6732",
    direccion: {
      provincia: "Cartago",
      canton: "Cartago",
      distrito: "Oriental"
    },
    fechaRegistro: new Date("2024-02-28"),
    activo: true
  },
  {
    nombre: "Diego",
    apellido: "Hernández Alvarado",
    email: "diego.hernandez@gmail.com",
    telefono: "7123-4567",
    direccion: {
      provincia: "San José",
      canton: "Desamparados",
      distrito: "Desamparados"
    },
    fechaRegistro: new Date("2024-03-05"),
    activo: true
  },
  {
    nombre: "Sofía",
    apellido: "Brenes Núñez",
    email: "sofia.brenes@yahoo.com",
    telefono: "8867-2341",
    direccion: {
      provincia: "Guanacaste",
      canton: "Liberia",
      distrito: "Liberia"
    },
    fechaRegistro: new Date("2024-04-12"),
    activo: false
  }
]);

// Activar cuenta de Sofía y corregir teléfono
db.usuarios.updateOne(
  { email: "sofia.brenes@yahoo.com" },
  { $set: { activo: true, telefono: "8867-0000" } }
);

// Eliminar usuario de prueba (Carlos)
db.usuarios.deleteOne({ email: "carlos.rojas@outlook.com" });

// ============================================================
// COLECCIÓN: prendas
// ============================================================

db.prendas.drop();

// Insertar una sola prenda
db.prendas.insertOne({
  nombre: "Camiseta Nike Dri-FIT",
  descripcion:
    "Camiseta deportiva con tecnología Dri-FIT para mantenerte seco durante el ejercicio.",
  marca: {
    nombre: "Nike",
    pais: "Estados Unidos"
  },
  categoria: "Camiseta",
  genero: "Masculino",
  precio: 22500,
  tallas: ["S", "M", "L", "XL"],
  colores: ["Negro", "Blanco", "Azul"],
  stock: 45
});

// Insertar varias prendas
db.prendas.insertMany([
  {
    nombre: "Sudadera Adidas Originals",
    descripcion:
      "Sudadera clásica con el icónico logo de Adidas Originals, ideal para el día a día.",
    marca: {
      nombre: "Adidas",
      pais: "Alemania"
    },
    categoria: "Sudadera",
    genero: "Unisex",
    precio: 38000,
    tallas: ["XS", "S", "M", "L", "XL"],
    colores: ["Gris", "Negro", "Blanco"],
    stock: 30
  },
  {
    nombre: "Pantalón Zara Slim Fit",
    descripcion:
      "Pantalón de corte slim fit con tela de alta calidad, perfecto para looks casuales y semiformales.",
    marca: {
      nombre: "Zara",
      pais: "España"
    },
    categoria: "Pantalón",
    genero: "Masculino",
    precio: 29990,
    tallas: ["28", "30", "32", "34", "36"],
    colores: ["Negro", "Beige", "Azul marino"],
    stock: 25
  },
  {
    nombre: "Camiseta Pull&Bear Basic",
    descripcion:
      "Camiseta básica de algodón con corte regular, esencial para cualquier guardarropa.",
    marca: {
      nombre: "Pull&Bear",
      pais: "España"
    },
    categoria: "Camiseta",
    genero: "Unisex",
    precio: 12990,
    tallas: ["XS", "S", "M", "L", "XL", "XXL"],
    colores: ["Blanco", "Negro", "Verde olivo", "Gris"],
    stock: 60
  },
  {
    nombre: "Chaqueta Tommy Hilfiger Classic",
    descripcion:
      "Chaqueta de estilo americano clásico con bordado del logo Tommy, corte relajado y elegante.",
    marca: {
      nombre: "Tommy Hilfiger",
      pais: "Estados Unidos"
    },
    categoria: "Chaqueta",
    genero: "Unisex",
    precio: 85000,
    tallas: ["S", "M", "L", "XL"],
    colores: ["Azul marino", "Rojo", "Blanco"],
    stock: 15
  },
  {
    nombre: "Jeans Levi's 501 Original",
    descripcion:
      "El jean más icónico de la historia, corte recto clásico con botones al frente.",
    marca: {
      nombre: "Levi's",
      pais: "Estados Unidos"
    },
    categoria: "Pantalón",
    genero: "Unisex",
    precio: 55000,
    tallas: ["28", "30", "32", "34", "36", "38"],
    colores: ["Azul claro", "Azul oscuro", "Negro"],
    stock: 35
  },
  {
    nombre: "Short Nike Running",
    descripcion:
      "Short deportivo con tecnología Dri-FIT y bolsillos laterales, ideal para correr.",
    marca: {
      nombre: "Nike",
      pais: "Estados Unidos"
    },
    categoria: "Short",
    genero: "Masculino",
    precio: 18500,
    tallas: ["S", "M", "L", "XL"],
    colores: ["Negro", "Gris", "Azul"],
    stock: 40
  },
  {
    nombre: "Blusa Zara Oversize",
    descripcion:
      "Blusa oversize con manga larga, perfecta para un look casual moderno.",
    marca: {
      nombre: "Zara",
      pais: "España"
    },
    categoria: "Blusa",
    genero: "Femenino",
    precio: 21500,
    tallas: ["XS", "S", "M", "L"],
    colores: ["Blanco", "Negro", "Mostaza"],
    stock: 28
  }
]);

// Actualizar precio y stock de Pull&Bear Basic
db.prendas.updateOne(
  { nombre: "Camiseta Pull&Bear Basic" },
  { $set: { precio: 14990 }, $inc: { stock: 20 } }
);

// Eliminar prenda de prueba
db.prendas.deleteOne({ nombre: "Blusa Zara Oversize" });

// ============================================================
// COLECCIÓN: ventas
// ============================================================

db.ventas.drop();

// Insertar una sola venta
db.ventas.insertOne({
  usuario: {
    nombre: "Andrés",
    apellido: "Mora Solano",
    email: "andres.mora@gmail.com"
  },
  prenda: {
    nombre: "Camiseta Nike Dri-FIT",
    marca: "Nike",
    categoria: "Camiseta",
    talla: "M",
    color: "Negro",
    precioUnitario: 22500
  },
  cantidad: 2,
  total: 45000,
  fecha: new Date("2024-03-15"),
  estado: "Completada"
});

// Insertar varias ventas
db.ventas.insertMany([
  {
    usuario: {
      nombre: "Valeria",
      apellido: "Jiménez Castro",
      email: "valeria.jimenez@hotmail.com"
    },
    prenda: {
      nombre: "Jeans Levi's 501 Original",
      marca: "Levi's",
      categoria: "Pantalón",
      talla: "30",
      color: "Azul claro",
      precioUnitario: 55000
    },
    cantidad: 1,
    total: 55000,
    fecha: new Date("2024-03-15"),
    estado: "Completada"
  },
  {
    usuario: {
      nombre: "María",
      apellido: "Vargas Quirós",
      email: "maria.vargas@gmail.com"
    },
    prenda: {
      nombre: "Sudadera Adidas Originals",
      marca: "Adidas",
      categoria: "Sudadera",
      talla: "S",
      color: "Gris",
      precioUnitario: 38000
    },
    cantidad: 1,
    total: 38000,
    fecha: new Date("2024-03-20"),
    estado: "Completada"
  },
  {
    usuario: {
      nombre: "Diego",
      apellido: "Hernández Alvarado",
      email: "diego.hernandez@gmail.com"
    },
    prenda: {
      nombre: "Chaqueta Tommy Hilfiger Classic",
      marca: "Tommy Hilfiger",
      categoria: "Chaqueta",
      talla: "L",
      color: "Azul marino",
      precioUnitario: 85000
    },
    cantidad: 1,
    total: 85000,
    fecha: new Date("2024-03-22"),
    estado: "Completada"
  },
  {
    usuario: {
      nombre: "Valeria",
      apellido: "Jiménez Castro",
      email: "valeria.jimenez@hotmail.com"
    },
    prenda: {
      nombre: "Camiseta Pull&Bear Basic",
      marca: "Pull&Bear",
      categoria: "Camiseta",
      talla: "M",
      color: "Blanco",
      precioUnitario: 14990
    },
    cantidad: 3,
    total: 44970,
    fecha: new Date("2024-03-28"),
    estado: "Completada"
  },
  {
    usuario: {
      nombre: "Andrés",
      apellido: "Mora Solano",
      email: "andres.mora@gmail.com"
    },
    prenda: {
      nombre: "Short Nike Running",
      marca: "Nike",
      categoria: "Short",
      talla: "L",
      color: "Negro",
      precioUnitario: 18500
    },
    cantidad: 2,
    total: 37000,
    fecha: new Date("2024-04-05"),
    estado: "Completada"
  },
  {
    usuario: {
      nombre: "Sofía",
      apellido: "Brenes Núñez",
      email: "sofia.brenes@yahoo.com"
    },
    prenda: {
      nombre: "Pantalón Zara Slim Fit",
      marca: "Zara",
      categoria: "Pantalón",
      talla: "32",
      color: "Negro",
      precioUnitario: 29990
    },
    cantidad: 1,
    total: 29990,
    fecha: new Date("2024-04-10"),
    estado: "Completada"
  },
  {
    usuario: {
      nombre: "María",
      apellido: "Vargas Quirós",
      email: "maria.vargas@gmail.com"
    },
    prenda: {
      nombre: "Camiseta Nike Dri-FIT",
      marca: "Nike",
      categoria: "Camiseta",
      talla: "S",
      color: "Blanco",
      precioUnitario: 22500
    },
    cantidad: 2,
    total: 45000,
    fecha: new Date("2024-04-15"),
    estado: "Completada"
  },
  {
    usuario: {
      nombre: "Diego",
      apellido: "Hernández Alvarado",
      email: "diego.hernandez@gmail.com"
    },
    prenda: {
      nombre: "Jeans Levi's 501 Original",
      marca: "Levi's",
      categoria: "Pantalón",
      talla: "34",
      color: "Negro",
      precioUnitario: 55000
    },
    cantidad: 1,
    total: 55000,
    fecha: new Date("2024-04-20"),
    estado: "Completada"
  },
  {
    usuario: {
      nombre: "Valeria",
      apellido: "Jiménez Castro",
      email: "valeria.jimenez@hotmail.com"
    },
    prenda: {
      nombre: "Sudadera Adidas Originals",
      marca: "Adidas",
      categoria: "Sudadera",
      talla: "M",
      color: "Negro",
      precioUnitario: 38000
    },
    cantidad: 2,
    total: 76000,
    fecha: new Date("2024-04-25"),
    estado: "Completada"
  },
  {
    usuario: {
      nombre: "Andrés",
      apellido: "Mora Solano",
      email: "andres.mora@gmail.com"
    },
    prenda: {
      nombre: "Camiseta Pull&Bear Basic",
      marca: "Pull&Bear",
      categoria: "Camiseta",
      talla: "L",
      color: "Negro",
      precioUnitario: 14990
    },
    cantidad: 4,
    total: 59960,
    fecha: new Date("2024-05-02"),
    estado: "Completada"
  },
  {
    usuario: {
      nombre: "María",
      apellido: "Vargas Quirós",
      email: "maria.vargas@gmail.com"
    },
    prenda: {
      nombre: "Chaqueta Tommy Hilfiger Classic",
      marca: "Tommy Hilfiger",
      categoria: "Chaqueta",
      talla: "M",
      color: "Rojo",
      precioUnitario: 85000
    },
    cantidad: 1,
    total: 85000,
    fecha: new Date("2024-05-15"),
    estado: "Completada"
  },
  {
    usuario: {
      nombre: "Sofía",
      apellido: "Brenes Núñez",
      email: "sofia.brenes@yahoo.com"
    },
    prenda: {
      nombre: "Pantalón Zara Slim Fit",
      marca: "Zara",
      categoria: "Pantalón",
      talla: "30",
      color: "Beige",
      precioUnitario: 29990
    },
    cantidad: 2,
    total: 59980,
    fecha: new Date("2024-05-20"),
    estado: "Completada"
  }
]);

// Marcar como devuelta una venta de prueba
db.ventas.updateOne(
  { "usuario.email": "sofia.brenes@yahoo.com", fecha: new Date("2024-04-10") },
  { $set: { estado: "Devuelta" } }
);

// Eliminar venta de prueba (duplicado de prueba)
db.ventas.deleteOne({
  "usuario.email": "andres.mora@gmail.com",
  "prenda.nombre": "Short Nike Running",
  fecha: new Date("2024-04-05")
});

// ============================================================
// CONSULTAS
// ============================================================

// Obtiene la cantidad total de unidades vendidas por prenda agrupadas
// por fecha, y filtra los resultados para mostrar solo las ventas
// realizadas en una fecha específica (2024-03-15).
print("\n--- Consulta 1: Cantidad vendida por prenda en fecha 2024-03-15 ---");
db.ventas.aggregate([
  { $match: { estado: "Completada" } },
  {
    $group: {
      _id: {
        fecha: { $dateToString: { format: "%Y-%m-%d", date: "$fecha" } },
        prenda: "$prenda.nombre",
        marca: "$prenda.marca"
      },
      cantidadVendida: { $sum: "$cantidad" }
    }
  },
  { $match: { "_id.fecha": "2024-03-15" } },
  {
    $project: {
      _id: 0,
      fecha: "$_id.fecha",
      prenda: "$_id.prenda",
      marca: "$_id.marca",
      cantidadVendida: 1
    }
  },
  { $sort: { cantidadVendida: -1 } }
]);

// Obtiene el listado de todas las marcas distintas que tienen
// al menos una venta registrada con estado "Completada",
// junto con el número total de transacciones por marca.
print("\n--- Consulta 2: Marcas con al menos una venta ---");
db.ventas.aggregate([
  { $match: { estado: "Completada" } },
  {
    $group: {
      _id: "$prenda.marca",
      totalTransacciones: { $sum: 1 }
    }
  },
  {
    $project: {
      _id: 0,
      marca: "$_id",
      totalTransacciones: 1
    }
  },
  { $sort: { marca: 1 } }
]);

// Cruza la colección prendas con ventas para mostrar cada prenda
// que ha sido vendida al menos una vez, indicando el total de
// unidades vendidas y la cantidad restante disponible en stock.
print("\n--- Consulta 3: Prendas vendidas y stock restante ---");
db.prendas.aggregate([
  {
    $lookup: {
      from: "ventas",
      let: { nombrePrenda: "$nombre" },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ["$prenda.nombre", "$$nombrePrenda"] },
                { $eq: ["$estado", "Completada"] }
              ]
            }
          }
        }
      ],
      as: "ventasRelacionadas"
    }
  },
  {
    $addFields: {
      totalVendido: { $sum: "$ventasRelacionadas.cantidad" }
    }
  },
  { $match: { totalVendido: { $gt: 0 } } },
  {
    $project: {
      _id: 0,
      prenda: "$nombre",
      marca: "$marca.nombre",
      categoria: 1,
      stockActual: "$stock",
      totalVendido: 1
    }
  },
  { $sort: { totalVendido: -1 } }
]);

// Agrupa todas las ventas completadas por marca, suma las unidades
// vendidas y retorna únicamente las 5 marcas con mayor volumen
// de ventas, ordenadas de mayor a menor.
print("\n--- Consulta 4: Top 5 marcas más vendidas ---");
db.ventas.aggregate([
  { $match: { estado: "Completada" } },
  {
    $group: {
      _id: "$prenda.marca",
      totalUnidadesVendidas: { $sum: "$cantidad" }
    }
  },
  { $sort: { totalUnidadesVendidas: -1 } },
  { $limit: 5 },
  {
    $project: {
      _id: 0,
      marca: "$_id",
      totalUnidadesVendidas: 1
    }
  }
]);
