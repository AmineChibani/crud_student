// controllers/cartierController.js

const express = require('express');
const router = express.Router();
const CartierModel = require('../models/cartierModel');

router.get("/getDataCartiers", async function (request, response, next) {
  try {
    // Fetch data for the "cartier" dropdown
    const quartiers = await CartierModel.getDataCartiers();
    response.json(quartiers);
  } catch (error) {
    console.error('Error fetching cartier data:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
