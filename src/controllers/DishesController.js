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

  async show(request, response) {
    const dish_id = request.params;

    const dish = await knex("dishes")
    .where({ id: dish_id })
    .first();

    if(!dish) {
      throw new AppError("This dish does not exist", 404);
    }

    const ingredients = await knex("ingredients")
    .where({ dish_id: id})
    .orderBy("name");

    return response.json({ 
      ...dish,
      ingredients
    });

  };

  async index(request, response) {
    const dish_id = request.user.id

    const { name, ingredients } = request.query

    const dishes = knex("dishes")
    .where("name", "like", `%${name}%`)
    .where("ingredients", "like", `%${ingredients}%`)
    .innerJoin("ingredients", "dish.id", "ingredients.dish_id")
    .select("dishes.name", "dishes.description", "dishes.picture", "dishes.price", "dishes.category", "ingredients.ingredients");

    return response.json(dishes);

  }

  async delete(request, response) {
    const dish_id = request.params.id;

    await knex("dishes").where({ id: dish_id }).delete();

    return response.json();

  };

};

module.exports = DishesController;