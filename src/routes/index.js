const { Router } = require('express');

const usersRoutes = require('./users.routes');
const sessionsRoutes = require('./sessions.routes');

const dishesRoutes = require('./dishes.routes');
const requestsRoutes = require('./requests.routes');
const ingredientsRoutes = require('./ingredients.routes');
const favoritesRoutes = require('./favorites.routes');

const routes = Router();
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/dishes', dishesRoutes);
routes.use('/requests', requestsRoutes);
routes.use('/ingredients', ingredientsRoutes);
routes.use('/favorites', favoritesRoutes);

module.exports = routes;