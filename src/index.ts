import "reflect-metadata";
import dotenv from "dotenv";
import express from "express";
const app = express();
import cors from "cors";
import morgan from "morgan";
import noteRoutes from "./routes/notes.routes";
import usersRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Note } from "./entities/Note";
dotenv.config();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/addNoteGames", noteRoutes);
app.use("/users", usersRoutes);
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
    entities: [User, Note]
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