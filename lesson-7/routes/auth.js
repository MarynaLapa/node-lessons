import express from "express";
import validateBody from "../helpers/validateBody";
import { registerSchema } from "../schemas/usersSchema";
import controllers from "../controllers/authControlers";

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), controllers.register);

export default authRouter;