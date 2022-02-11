import express from "express";
import { NotFoundError } from "./helpers/http";
import routes from "./routes";
import { DatabaseService } from "./services/DatabaseService";

export const createApp = async () => {
  const app = express();
  app.set("view engine", "ejs");

  await DatabaseService.init();
  // await DatabaseService.sequelize.sync({ alter: true }); // uncomment to sync tables

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
