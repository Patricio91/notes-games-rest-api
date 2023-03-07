import { Router } from "express";
import { addNoteGame, getNote, getAllNotes, deleteNote, updateNote } from "../controllers/notes.controller";
import { isUser } from "../middlewares/validateRole";
const router = Router();

// POST
router.post("/note", isUser, addNoteGame);

// GET
router.get("/note", isUser, getAllNotes);
router.get("/note/:id", isUser, getNote);

// PUT
router.put("/note/:id", isUser, updateNote);

// DELETE
router.delete("/note/:id", isUser, deleteNote);

export default router;