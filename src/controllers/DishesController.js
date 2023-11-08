const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class DishesController {
  async create(request, response) {
    const { name, description, picture, price, category, ingredients } = request.body;

    const checkDishExists = await knex("dishes")
    .where("name", name)
    .first();
    
      if(checkDishExists){
      throw new AppError("This dish has already been created", 409)
    };

    const [ dish_id ]  = await knex("dishes").insert({
        name,
        description,
        picture,
        price,
        category
    });

    const insertIngredients = ingredients.map(name => {
      return {
        dish_id,
        name
      }
    });

    await knex("ingredients").insert(insertIngredients);

    return response.json();

  };

  async update(request, response) {
    const dish_id = request.params.id;
    const { name, description, price, category, ingredients } = request.body;

    const updateDishes = await knex("dishes")
    .where({ id: dish_id })
    .update({
      name,
      description,
      price,
      category,
    });

    await knex("ingredients").where({ id: dish_id }).delete()

    const updateIngredients = ingredients.map((name) => {
      return {
        dish_id,
        name
      }
    });

    await knex("ingredients").where({ id: dish_id }).insert(updateIngredients)
    

    return response.json(updateDishes);

  };

  async delete(request, response) {
    const dish_id = request.params.id;

    await knex("dishes").where({ id: dish_id }).delete();

    return response.json();

  };

};

module.exports = DishesController;