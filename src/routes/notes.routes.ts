import { Router, Request, Response } from "express";
import { addNoteGame } from "../controllers/notes.controller";
import { isUser } from "../middlewares/validateUser";
const router = Router();

router.post("/addNoteGame", isUser, addNoteGame);

export default router;