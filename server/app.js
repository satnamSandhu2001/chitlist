const express = require('express');
const errorMiddleware = require('./middlewares/error');

const app = express();

app.use(express.json());

app.use('/api/v1/auth', require('./routes/auth.routes'));

app.use(errorMiddleware);

module.exports = app;
