import express from "express";
import controllers from "../controllers/booksControllers.js";
import { createBooksSchema, updateBooksSchema, updateFavoriteSchema } from './../schemas/booksSchemas.js';
import validateBody from './../helpers/validateBody.js';
import { isValidId } from "../middlewares/isValidid.js";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

router.get("/", authenticate, controllers.getAllBooks);

router.get("/:id", authenticate, isValidId, controllers.getOneBook);

router.post("/", authenticate, validateBody(createBooksSchema), controllers.createBook);

router.put("/:id", authenticate, isValidId, validateBody(updateBooksSchema), controllers.updateBook);

router.delete("/:id", authenticate, isValidId, controllers.deleteBook);

router.patch("/:id/favorite", authenticate, isValidId, validateBody(updateFavoriteSchema), controllers.updateFavorite);

export default router;
