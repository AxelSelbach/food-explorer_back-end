const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class DishesController {
  async create(request, response) {
    const user_id = request.user.id
    const { name, description, picture, price, category } = request.body
    

  }
}