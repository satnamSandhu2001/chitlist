require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT;

process.on('uncaughtException', function (error) {
  console.error(error.stack);
});

const server = app.listen(PORT, () => {
  console.log('Server Listining on http://localhost:%d', server.address().port);
});
