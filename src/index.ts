import "reflect-metadata";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
const app = express();
import gamesRoutes from "./routes/games.routes";
import { DataSource } from "typeorm";
import { Game } from "./entities/Game";
dotenv.config();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/addGames", gamesRoutes);

// Database
export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: process.env.MYSQL_PASSWORD,
    database: "games-database",
    synchronize: true,
    logging: true,
    entities: [Game]
})

// Server
async function main() {
    try {
        await AppDataSource.initialize();
        console.log("--------------------------------");
        console.log("Database connected in MySQL");
        console.log("--------------------------------");
        app.listen(8080);
        console.log("Server is listening on port", 8080);
        console.log("--------------------------------");
    } catch (error) {
        console.log("Error. Something wrong here");
        console.log(error);
    }
}
main();