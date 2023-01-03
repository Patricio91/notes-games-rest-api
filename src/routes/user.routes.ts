import { Router } from "express";
import { getAllUser, getUser, updateUser, deleteUser } from "../controllers/user.controllers";
import { isUser, isAdmin } from "../middlewares/validateRole";
const router = Router();

router.get("/getUsers", isAdmin, getAllUser);
router.get("/getUser/:id", isAdmin, getUser);
router.put("/updateUser/:id", isUser, updateUser);
router.delete("/deleteUser/:id", isUser, deleteUser);

export default router;