require('dotenv/config')
require('express-async-errors');


const cors = require('cors')

const database = require('./database/sqlite');

const AppError = require('./utils/AppError');

const express = require('express');

const routes = require('./routes');

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

database()

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message
    });
  }

  console.error(error);

  return response.status(500).json({
    status: 500,
    message: 'Internal server error'
  });

});

const PORT = process.env.PORT || 3000;

console.log(process.env.PORT)

app.listen(PORT, () => console.log(`Server is running at Port ${PORT}`)); 
