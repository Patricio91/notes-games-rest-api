import { Request, Response } from "express";
import { Game } from "../entities/Game";
import { gameSchema } from "../validators/gameSchema";

export const addGame = async (req: Request, res: Response) => {
    try {
        const { name, description, year, category, price, console } = req.body;
        const result = await gameSchema.validateAsync(req.body);
        const game = new Game();
        game.name = name;
        game.description = description;
        game.year = year;
        game.category = category;
        game.price = price;
        game.console = console;
        console.log(result);
        const saveGame = await game.save();
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
}