const sqliteConnection = require('../database/sqlite');
const knex = require('../database/knex')

const AppError = require('../utils/AppError');
const { hash, compare } = require('bcryptjs');

class UsersController{

  async create(request, response){
    const {name, email, password, isAdmin} = request.body;

    const checkUserExist = await knex("users")
    .where({ email })
    .first();

     if(checkUserExist){
      throw new AppError("This e-mail is already in use")
    };

    const hashedPassword = await hash(password, 8)

    await knex("users").insert({
      name,
      email,
      password: hashedPassword,
      isAdmin: isAdmin ? 1 : 0,
    })


    return response.status(201).json();
    
  };

  async update(request, response) {
    const {name, email, password, old_password} = request.body;

    const user_id = request.user.id;


    const user = await knex("users")
    .select([
      "id",
      "name",
      "email",
      "password",
      
    ])
    .where({id: user_id})
    .first();


    if(!user){
      throw new AppError("User not found")
    };

    const userWithUpdatedEmail = await knex("users")
   .select([
      "id",
      "name",
      "email",
      "password",
    ])
    .where({ email })
    .first();

    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
      throw new AppError("This e-mail is already in use")
    };

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if(password && !old_password) {
      throw new AppError("You must enter your old password to update your new password.")

    };

    if(password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);
      
      if(!checkOldPassword) {
        throw new AppError("Your old password is incorrect.")
      };
      
      user.password = await hash(password, 8);
    }

    await knex("users")
    .update({
      name: user.name,
      email: user.email,
      password: user.password,
      updated_at: new Date()
    })
    .where({ id: user_id});

    return response.json();
  };

};

module.exports = UsersController;