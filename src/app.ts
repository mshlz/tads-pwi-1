import express from "express";
import { NotFoundError } from "./helpers/http";
import routes from "./routes";
import { DatabaseService } from "./services/DatabaseService";
import { engine } from 'express-handlebars';
import path from 'path'
import session from 'express-session'
import { JWT_SKEY } from "./config/env";

export const createApp = async () => {
  const app = express();

  app.engine('.hbs', engine({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.resolve(__dirname, '../views/layouts'),
    partialsDir: path.resolve(__dirname, '../views/partials')
  }))
  app.set("view engine", '.hbs');
  
  app.use(session({
    secret: JWT_SKEY,
    resave: false,
    saveUninitialized: true,
  }))

  await DatabaseService.init();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(routes);

  /** Catch any invalid route */
  app.use("*", () => {
    throw new NotFoundError("Page not found");
  });

  /** Error handler */
  app.use((error, req, res, next) => {
    return res.status(error.statusCode || 400).json({
      ...error,
      error: true,
      message: error.message,
    });
  });

  return app;
};
