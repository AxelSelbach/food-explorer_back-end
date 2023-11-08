const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class DishesController {
  async create(request, response) {
    const { name, description, picture, price, category, ingredients } = request.body;
    const user_id = request.user.DishesController;

    const checkDishExists = await knex("dishes")
    .where("name", name)
    .first();
    
      if(checkDishExists){
      throw new AppError("This dish has already been created", 409)
    };

    const [ dish_id ]  = await knex("notes").insert({
        name,
        description,
        picture,
        price,
        category,
        ingredients,
        user_id
    });

    const insertIngredients = ingredients.map((name) => {
      return {
        dish_id,
        name
      }
    });

    await knex("ingredients").insert(insertIngredients);

    return response.status(201).json();

  };

  async update(request, response) {
    const { dish_id } = request.params.id;
    const { name, description, price, category, ingredients } = request.body;

    const updateDishes = await knex("dishes")
    .where({ id: dish_id })
    .update({
      name,
      description,
      picture,
      price,
      category,
      ingredients
    });

    return response.status(200).json();

  };

};

module.exports = DishesController;