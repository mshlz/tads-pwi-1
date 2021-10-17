const express = require("express");
const { NotFoundError } = require("./helpers/http");
const routes = require("./routes");

const app = express();
app.set('view engine', 'ejs');

app.use(express.json());
app.use(routes);

/** Catch any invalid route */
app.use('*', () => {
    throw new NotFoundError('Page not found')
})

/** Error handler */
app.use((error, req, res, next) => {
  return res.status(error.statusCode || 400).json({
      ...error,
      error: true,
      message: error.message
  });
});

module.exports = app;
