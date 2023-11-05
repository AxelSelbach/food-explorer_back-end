require('express-async-errors');

const cors = require('cors');

const database = require('./database/sqlite');

const AppError = require('./utils/AppError');

const express = require('express');

const routes = require('./routes');

const app = express();
app.use(express.json());

app.use(routes);

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message
    });
  }
})

const PORT = 3333;

app.listen(PORT, () => console.log(`Server is running at Port ${PORT}`)); 
