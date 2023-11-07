const knex = require('../database/knex');

class IngredientsController {
  async create(request, response) {
    const { name } = request.body;

    const ingredients = await knex("ingredients").insert({ name });

    return response.status(201).json(ingredients);

  };
  
};

module.exports = IngredientsController;