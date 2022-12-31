import "reflect-metadata";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
const app = express();
import gamesRoutes from "./routes/games.routes";
import authRoutes from "./routes/auth.routes";
import { DataSource } from "typeorm";
import { Game } from "./entities/Game";
import { User } from "./entities/User";
dotenv.config();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/addGames", gamesRoutes);
app.use("/auth", authRoutes);

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
    entities: [User, Game]
})

// Server
async function main() {
    try {
        await AppDataSource.initialize();
        console.log("Database connected in MySQL");
        app.listen(8080);
        console.log("Server is listening on port", 8080);
    } catch (error) {
        console.log("Error. Something wrong here");
        console.log(error);
    }
}
main();