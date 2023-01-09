import { Router} from "express";
import { addNoteGame, getNote, getAllNotes, deleteNote, updateNote } from "../controllers/notes.controller";
import { isUser } from "../middlewares/validateRoleToken";
const router = Router();

router.post("/note", isUser, addNoteGame);
router.get("/note", isUser, getAllNotes);
router.get("/note/:id", isUser, getNote);
router.put("/note/:id", isUser, updateNote);
router.delete("/note/:id", isUser, deleteNote);

export default router;