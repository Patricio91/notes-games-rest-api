import { Router, Request, Response } from "express";
import { addNoteGame } from "../controllers/notes.controller";
const router = Router();

router.post("/addNoteGame", addNoteGame)

export default router;