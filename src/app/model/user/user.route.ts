import { Router } from "express";
import { login, register } from "./user.controller";

const router = Router();

router.post('/register', register);
router.post('/login', login);

export const userRouter = router; 