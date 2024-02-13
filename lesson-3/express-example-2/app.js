const express = require("express");

const books = require("./books");

const app = express();

app.get("/books", (req, res) => {
    const databaseResponse = null; // - імітація відповіді бази даних
    // res.json(databaseResponse); 
    // res.send(databaseResponse); 
    res.json(books); 
});

app.listen(4000, () => console.log('Server running'));