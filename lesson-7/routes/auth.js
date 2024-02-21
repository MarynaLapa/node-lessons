import express from "express";
import validateBody from "../helpers/validateBody.js";
import { registerSchema } from "../schemas/usersSchema.js";
import controllers from "../controllers/authControllers.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), controllers.register);

export default authRouter;