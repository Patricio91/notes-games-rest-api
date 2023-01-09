import "reflect-metadata";
import express from "express";
const app = express();
import { AppDataSource } from "./database";
import cors from "cors";
import morgan from "morgan";
import noteRoutes from "./routes/notes.routes";
import usersRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";

// MIDDLEWARES
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// ROUTES
app.use("/api", noteRoutes);
app.use("/api", usersRoutes);
app.use("/api", authRoutes);
app.use((req, res, next) => { res.status(404).json({message: "404 - Page not found"}) });

// SERVER
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