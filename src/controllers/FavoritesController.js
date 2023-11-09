const knex = require('knex');
const AppErro = require('../utils/AppError');

class FavoritesController {
  async create(request, response) {
    const user_id = request.user.id;
    const { dish_id } = request.body;

    const favoriteDishExists = await knex("favorites").where({ user_id, dish_id }).first();

    if (favoriteDishExists) {
      throw new AppErro('This dish is already in your favorites', 409);
    } 

    const favoriteDish = {
      dish_id,
      user_id
    };

    await knex("favorites").insert(favoriteDish);

    return response.json();

  };

};

module.exports = FavoritesController;