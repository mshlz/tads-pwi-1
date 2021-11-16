const Sequelize = require("sequelize");
const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, DB_DIALECT } = require("../config/env");

class DatabaseService {
  static _sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT,
  });

  static async init() {
    try {
      await this._sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
      throw error;
    }
  }

  static get sequelize() {
    return this._sequelize;
  }

  static get Sequelize() {
    return Sequelize;
  }
}

module.exports = { DatabaseService };
