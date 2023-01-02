import { Router} from "express";
import { addNoteGame, getNote, getAllNotes, deleteNote, updateNote } from "../controllers/notes.controller";
import { isUser } from "../middlewares/validateRole";
const router = Router();

router.post("/addNoteGame", isUser, addNoteGame);
router.get("/getNotes", isUser, getAllNotes);
router.get("/getNote", isUser, getNote);
router.put("/updateNote", isUser, updateNote);
router.delete("deleteNote", isUser, deleteNote);

export default router;