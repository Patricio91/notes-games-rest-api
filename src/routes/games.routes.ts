import { Router, Request, Response } from "express";
import { addGame } from "../controllers/games.controller";

const router = Router();

router.post("/addGame", addGame)

export default router;