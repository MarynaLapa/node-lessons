import express from 'express';
import controllers from '../controllers/usersControllers.js';
import validateBody from '../helpers/validateBody.js';
import authenticate from '../middlewares/authenticate.js';
import { isValidId } from '../middlewares/isValidid.js';
import { subscriptionSchema } from '../schemas/usersSchema.js';

const usersRouter = express.Router();

usersRouter.get("/", controllers.getAllUsers);

usersRouter.get("/:id", isValidId, controllers.getOneUser);

usersRouter.post("/:id", isValidId, controllers.deleteUser);

usersRouter.patch('/:id/subscription', authenticate, validateBody(subscriptionSchema), controllers.updateSubscription);

export default usersRouter;