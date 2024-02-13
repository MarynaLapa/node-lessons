import path from "node:path";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const booksPath = path.join(__dirname, "db", "books.json");

