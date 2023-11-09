const { Router } = require('express');

const FavoritesController = require('../controllers/FavoritesController');

const favoritesController = new FavoritesController();

const favoritesRoutes = Router();

favoritesRoutes.put("/", favoritesController.create);
favoritesRoutes.get("/", favoritesController.index);
favoritesRoutes.delete("/", favoritesController.delete);

module.exports = favoritesRoutes;