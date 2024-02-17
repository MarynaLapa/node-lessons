import express from "express";
import controllers from "../controllers/booksControllers.js";
import { createBooksSchema } from './../schemas/booksSchemas.js';
import validateBody from './../helpers/validateBody.js';

const router = express.Router();

router.get("/", controllers.getAllBooks);

router.get("/:id", controllers.getOneBook);

router.post("/", validateBody(createBooksSchema), controllers.createBook);

router.put("/:id", validateBody(createBooksSchema), controllers.updateBook);

router.delete("/:id", controllers.deleteBook);

export default router;
