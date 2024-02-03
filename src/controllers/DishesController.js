const knex = require('../database/knex')
const AppError = require('../utils/AppError')

class DishesController {
  async create(request, response) {
    const { name, description, picture, price, category, ingredients } = request.body;

    const checkDishExists = await knex('dishes').where('name', name).first()

    if (checkDishExists) {
      throw new AppError('This dish has already been created', 409)
    }

    const [dish_id] = await knex('dishes').insert({
      name,
      description,
      picture,
      price,
      category
    })

    const insertIngredients = ingredients.map(name => {
      return {
        dish_id,
        name
      }
    })

    await knex('ingredients').insert(insertIngredients)

    return response.json()
  }

  async update(request, response) {
    const dish_id = request.params.id
    const { name, description, price, picture, category, ingredients } = request.body

    const updateFields = {
      name,
      description,
      price,
      category
    }

    if (picture !== undefined && picture !== null && picture !== '') {
      updateFields.picture = picture;
    }


    const updateDishes = await knex('dishes').where({ id: dish_id }).update(updateFields)

    await knex('ingredients').where({ dish_id }).delete()

    const updateIngredients = ingredients.map(ingredientName => {
      return {
        dish_id,
        name: ingredientName,
      }
    })

    await knex('ingredients').insert(updateIngredients)

    return response.json(updateDishes)
  }

  async show(request, response) {
    const dish_id = request.params.id

    const dish = await knex('dishes').where({ id: dish_id }).first()

    if (!dish) {
      throw new AppError('This dish does not exist', 404)
    }

    const ingredients = await knex('ingredients')
      .where({ dish_id })
      .orderBy('name')

    return response.json({
      ...dish,
      ingredients
    })
  }

  async index(request, response) {
    const { search } = request.query

    let dishSearch = knex('dishes')
      .select([
        'dishes.id',
        'dishes.name',
        'dishes.description',
        'dishes.picture',
        'dishes.price',
        'dishes.category'
      ])
      .distinct()
      .orderBy('dishes.name')

      if (search) {
        dishSearch = dishSearch
        .where('dishes.name', 'like', `%${search}%`)
        .orWhere('ingredients.name', 'like', `%${search}%`)
        .join('ingredients', 'dishes.id', '=', 'ingredients.dish_id')
      }

      const dishes = await dishSearch

    return response.json(dishes)
  }

  async delete(request, response) {
    const dish_id = request.params.id

    await knex('dishes').where({ id: dish_id }).delete()

    return response.json()
  }
}

module.exports = DishesController
