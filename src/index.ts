import "reflect-metadata";
import { AppDataSource } from "./database";
import express from "express";
const app = express();
import cors from "cors";
import morgan from "morgan";
import noteRoutes from "./routes/notes.routes";
import usersRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/notes", noteRoutes);
app.use("/users", usersRoutes);
app.use("/auth", authRoutes);
app.use((req, res, next) => { res.status(404).json({message: "404 - Page not found"}) });

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