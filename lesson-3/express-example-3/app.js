const express = require("express"); 
// const moment = require("moment"); // пункт 8.1 - 8.5.2
const fs = require("node:fs/promises");
const cors = require('cors');

const books = require("./books");

const app = express();

// const corsMiddleware = cors();
// app.use(corsMiddleware); Короткий запис нижче)
app.use(cors());

/* пункт 8.1 - 8.5.2
// app.use(async (req, res, next) => {
//     const { url, method } = req;
//     const date = moment().format("DD-MM-YYYY_hh:mm:ss");
//     await fs.appendFile("./public/server.log", `\n${method} ${url} ${date}`);
//     next();
// });
*/
/* 
// app.use((req, res, next) => {
//     // console.log('First middlewere');
//     next();
// });

// // app.use((req, res, next) => {
// //     console.log('Second middlewere');
// //     next();
// // });
*/

app.get("/products", async(req, res) => {
    res.json([]);
});

app.get("/books", async(req, res) => {
    res.json(books);
});

app.use((req, res) => {
    res.status(404).json({
        message: "404 Not Found"
    })
})

app.listen(3000); 