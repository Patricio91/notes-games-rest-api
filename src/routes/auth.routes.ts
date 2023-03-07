import { Router } from "express";
import { signIn, signUp } from "../controllers/user.controllers";
const router = Router();

// POST
router.post("/signup", signUp);
router.post("/signin", signIn);

export default router;

