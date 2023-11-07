const { Router } = require('express');

const usersRoutes = require('./users.routes');
const sessionsRoutes = require('./sessions.routes');
const ingredientsRoutes = require('./ingredients.routes')

const routes = Router();
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/ingredients', ingredientsRoutes);

module.exports = routes;