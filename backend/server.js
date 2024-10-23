const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: 'http://localhost:5173/', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('../lista-compras'));


let GroceryList = [];

app.get('/items', (req, res) => {
  res.json(GroceryList);
});

app.post('/items', async (req, res) => {
  const { id } = req.body; 

  if (!id) {
    return res.status(400).json({ error: 'Se requiere un ID de producto' });
  }

  try {
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    const product = response.data;

    const newItem = {
      id: Date.now(), 
      name: product.title,
      image: product.image,
      isPurchased: false,
    };

    GroceryList.push(newItem);
    res.json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Error al conectarse a la Fake Store API' });
  }
});

app.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const item = GroceryList.find((item) => item.id === parseInt(id));

  if (!item) {
    return res.status(404).json({ error: 'Artículo no encontrado' });
  }

  item.isPurchased = !item.isPurchased;
  res.json(item);
});

app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  GroceryList = GroceryList.filter((item) => item.id !== parseInt(id));

  res.json({ message: 'Artículo eliminado' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../lista-compras', 'index.html')); // Enviamos el archivo 'index.html' como respuesta
});
