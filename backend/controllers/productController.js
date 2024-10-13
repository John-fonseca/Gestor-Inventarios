// backend/controllers/productController.js
let products = []; // Tu array de productos

// Obtener todos los productos
exports.getProducts = (req, res) => {
  res.json(products);
};

// Agregar un nuevo producto
exports.addProduct = (req, res) => {
  const { name, quantity, price } = req.body;
  const newProduct = { name, quantity, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
};

// Actualizar un producto existente
exports.updateProduct = (req, res) => {
  const index = parseInt(req.params.index);
  const { name, quantity, price } = req.body;

  if (index >= 0 && index < products.length) {
    products[index] = { name, quantity, price };
    return res.json(products[index]);
  }

  res.status(404).json({ message: "Producto no encontrado" });
};
