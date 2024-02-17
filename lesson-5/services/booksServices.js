import { nanoid } from "nanoid";
import fs from "node:fs/promises"
import { booksPath } from "../path.js";

export const getAll = async () => {
    const data = await fs.readFile(booksPath);
    return JSON.parse(data);
}

export const getById = async (id) => {
    const data = await getAll(); 
    const result = data.find(el => el.id === id); 
    return result || null; 
}

export const addBook = async (data) => {
    const newBook = {
        id: nanoid(),
        ...data,
    }

    const books = await getAll();
    books.push(newBook);

    await fs.writeFile(booksPath, JSON.stringify(books, null, 2))
    return newBook;
}

export const updateById = async (id, data) => {
    const books = await getAll();

    const index = books.findIndex(el => el.id === id); 
    if (index === -1) return null;
    books[index] = Object.assign(books[index], data);

    await fs.writeFile(booksPath, JSON.stringify(books, null, 2));

    return books[index]
}

export const removeById = async (id) => {
    const books = await getAll();

     const index = books.findIndex(el => el.id === id); 
    if (index === -1) return null;
    const [result] = books.splice(index, 1)

    await fs.writeFile(booksPath, JSON.stringify(books, null, 2));

    return result
}

