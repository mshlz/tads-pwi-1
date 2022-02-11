
import { Connection, createConnection } from "typeorm";
import { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } from "../config/env";
import { Link } from "../models/Link";

export class DatabaseService {
  static _connection: Connection

  static async init() {
    try {
      this._connection = await createConnection({
        host: DB_HOST,
        database: DB_NAME,
        username: DB_USER,
        password: DB_PASSWORD,
        type: 'postgres',
        entities: [Link]
      })
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
      throw error;
    }
  }

  static get connection() {
    return this._connection;
  }
}
