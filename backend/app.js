// server.js
const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Función para leer productos desde el archivo JSON
const readProducts = () => {
  const dataPath = path.join(__dirname, "data", "products.json");
  const data = fs.readFileSync(dataPath);
  return JSON.parse(data);
};

// Función para escribir productos en el archivo JSON
const writeProducts = (products) => {
  const dataPath = path.join(__dirname, "data", "products.json");
  fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
};

// Obtener todos los productos
app.get("/api/products", (req, res) => {
  const products = readProducts();
  res.json(products);
});

// Agregar un nuevo producto
app.post("/api/products", (req, res) => {
  const products = readProducts();
  const newProduct = {
    id: products.length ? products[products.length - 1].id + 1 : 1,
    name: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price,
  };
  products.push(newProduct);
  writeProducts(products);
  res.status(201).json(newProduct);
});

// Actualizar un producto existente
app.put("/api/products/:id", (req, res) => {
  const products = readProducts();
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }

  products[productIndex] = {
    id: productId,
    name: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price,
  };

  writeProducts(products);
  res.json(products[productIndex]);
});

// Eliminar un producto
app.delete("/api/products/:id", (req, res) => {
  const products = readProducts();
  const productId = parseInt(req.params.id);
  const newProducts = products.filter((p) => p.id !== productId);

  if (newProducts.length === products.length) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }

  writeProducts(newProducts);
  res.status(204).send();
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
