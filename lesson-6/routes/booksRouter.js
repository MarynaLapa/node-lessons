import express from "express";
import controllers from "../controllers/booksControllers.js";
import { createBooksSchema, updateBooksSchema, updateFavoriteSchema } from './../schemas/booksSchemas.js';
import validateBody from './../helpers/validateBody.js';
import { isValidId } from "../middlewares/isValidid.js";

const router = express.Router();

router.get("/", controllers.getAllBooks);

router.get("/:id", isValidId, controllers.getOneBook);

router.post("/", validateBody(createBooksSchema), controllers.createBook);

router.put("/:id", isValidId, validateBody(updateBooksSchema), controllers.updateBook);

router.delete("/:id", isValidId, controllers.deleteBook);
router.patch("/:id/favorite", isValidId, validateBody(updateFavoriteSchema), controllers.updateFavorite)
export default router;
