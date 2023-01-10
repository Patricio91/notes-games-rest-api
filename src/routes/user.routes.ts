import { Router } from "express";
import { getAllUser, getUser, updateUser, deleteUser } from "../controllers/user.controllers";
import { isUser, isAdmin } from "../middlewares/validateRole";
const router = Router();

router.get("/user", isAdmin, getAllUser);
router.get("/user/:id", isAdmin, getUser);
router.put("/user/:id", isUser, updateUser);
router.delete("/user/:id", isUser, deleteUser);

export default router;