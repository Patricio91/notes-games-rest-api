import { Router } from "express";
import {
    getAllUser,
    getUser,
    updateUser,
    deleteUser
} from "../controllers/user.controllers";
import { validateId } from "../middlewares/validateId";
import { isUser, isAdmin } from "../middlewares/validateRole";
const router = Router();

// GET
router.get("/user", isAdmin, getAllUser);
router.get("/user/:id", isUser, validateId, getUser);

// PUT
router.put("/user/:id", isUser, validateId, updateUser);

// DELETE
router.delete("/user/:id", isUser, deleteUser);

export default router;