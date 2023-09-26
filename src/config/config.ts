import { configDotenv } from "dotenv"

configDotenv();
const env = process.env;

export default {
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    dialect: env.DB_DIALECT,
    host: env.DB_HOST,
}