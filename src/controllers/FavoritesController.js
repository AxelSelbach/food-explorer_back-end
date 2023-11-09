const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class FavoritesController {
  async create(request, response) {
    const user_id = request.user.id;
    const { dish_id } = request.body;

    const favoriteDishExists = await knex("favorites").where({ user_id, dish_id }).first();

    if (favoriteDishExists) {
      throw new AppError('This dish is already in your favorites', 409);
    } 

    const favoriteDish = {
      dish_id,
      user_id
    };

    await knex("favorites").insert(favoriteDish);

    return response.json();

  };

  async index(request, response) {
    const user_id = request.user.id;

    const favorites = await knex("favorites")
    .where({ user_id })
    .join("dishes", "favorites.dish_id", "=", "dishes.id")
    .select([
      "dish.id",
      "dish.name",
      "dish.picture"
    ])
    .orderBy("dish.name")

    return response.json(favorites);

  };

  async delete(request, response) {
    const { dish_id } = request.params

    await knex("favorites").where({ dish_id }).delete();

    return response.json();

  };

};

module.exports = FavoritesController;