import express from "express";
import validateBody from "../helpers/validateBody.js";
import { loginSchema, registerSchema, subscriptionSchema } from "../schemas/usersSchema.js";
import controllers from "../controllers/authControllers.js";
import authenticate from "../middlewares/authenticate.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), controllers.register);

authRouter.post('/login', validateBody(loginSchema), controllers.login);

authRouter.get('/current', authenticate, controllers.current);

authRouter.post('/logout', authenticate, controllers.logout);

authRouter.patch('/subscription', validateBody(subscriptionSchema), controllers.updateSubscription);


export default authRouter;