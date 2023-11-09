const knex = require('../database/knex')
const AppError = require('../utils/AppError')

class RequestsController {
  async create(request, response) {
    const { dish_id, total_price, user_id } = request.body;

    const checkRequestExists = await knex('requests')
    .where('dish_id', dish_id)
    .orWhere('user_id', user_id)
    .first();

    if (checkRequestExists) {
      throw new AppError('This request has already been created', 409)
    };

    const [request_id] = await knex('requests')
    .insert({
      dish_id,
      total_price,
      user_id
    });

    return response.json({ request_id });

  };

  async update(request, response) {
    const request_id = request.params.id;
    const { dish_id, total_price, user_id } = request.body;

    const updateRequest = await knex('requests').where({ id: request_id }).update({
      dish_id,
      total_price,
      user_id
    });

    return response.json({ updateRequest });

  };

  async show(request, response) {
    const request_id = request.params.id;

    const request = await knex('requests').where({ id: request_id }).first();

    if (!request) {
      throw new AppError('This request does not exist', 404)
    };

    return response.json(request);

  };

  async index(request, response) {
    const requests = await knex('requests').select('*');

    return response.json(requests);

  };

  async delete(request, response) {
    const request_id = request.params.id;

    await knex('requests').where({ id: request_id }).delete();

    return response.json();
  };
  
};

module.exports = RequestsController;
