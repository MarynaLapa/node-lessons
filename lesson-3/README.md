<!--// Алгоритм налаштування wep-сервера express-example-1 -->
// 1. Встановлюємо залежність npm i express. 
// 2. Імпортуємо express з express => const express = require('express');
const express = require('express');
// 3. Для того щоб створити wep-сервер потрібно виклакити функцію express => const app = express(); 
const app = express(); 
// 4. Потім викликаємо метод в який передаємо першим аргументом назву порта 4000, а другим колбек функцію для того, щоб переконатися у його роботі.
// 4.1 Якщо пишимо фронтенд та бекенд одночасно порти повинні відрізнятися. Для беку раще написати 3001, бо реакт працює з 3000 портом.
app.listen(4000, () => console.log('Server running'));
// 5. npm start => Server running - it is ok))
// 6. Викликаємо потрібний сервер. Першим аргументом передаємо маршруит, другим аргументом фунцію, яка спрацьовує коли маршрут знайден.
// req - request це об'єкт у якому зберігається вся інформація про запит. наприкладб тіло запита, метод...
// res - response це об'єкт який дозволяє налаштувати та твідправити відповідь. 
app.get("/", (req, res) => {
    res.send('<h1>Home page</h1>'); // метод send потрібен для відправки відповіді. Відповідь може бути, як у вигляді розмітки так і у вигляді json  
});
app.get("/contacts", (req, res) => {
    res.send('<h1>Contacts page</h1>');
});
// P.S. res.send('<h2>Contacts book</h2>'); другий раз відправити відповідь не можливо!!!
// Якщо потрібно відправляти html-розмітку потрібно використовувати шаблонізатори. 
// Якщо потрібно передати імпортований json файл. Наприклад book => res.send(book); 
// 7. Перевіримо. У хромі у пошукову рядку http://localhost:4000 або http://localhost:4000/contacts і отримуємо заголовки на сторінки. Якщо пропишемо адресу якої не має побачемо повідомлення про помилку. Cannot GET /products 

<!-- Нюанси роботи express express-example-2 -->
// 1. Імпортуємо books-файл => const books = require("./books");. 
// 2. Імпортуємо express з express => const express = require('express');
// 3. Для того щоб створити wep-сервер потрібно виклакити функцію express => const app = express(); 
// 4. Потім викликаємо метод в який передаємо першим аргументом назву порта 4000, а другим колбек функцію для того, щоб переконатися у його роботі.
// 4.1 Якщо пишимо фронтенд та бекенд одночасно порти повинні відрізнятися. Для беку раще написати 3001, бо реакт працює з 3000 портом.
app.listen(4000, () => console.log('Server running'));
// 5. npm start => Server running - it is ok))
// 6. Викликаємо потрібний сервер. Першим аргументом передаємо маршруит, другим аргументом фунцію, яка спрацьовує коли маршрут знайден.
// req - request це об'єкт у якому зберігається вся інформація про запит. наприкладб тіло запита, метод...
// res - response це об'єкт який дозволяє налаштувати та твідправити відповідь. => 
app.get("/books", (req, res) => {
    res.send(books);
});
// P.S. Потрібно передати імпортований json файл. Наприклад books => res.send(books); 
// 7. Перевіримо. У хромі у пошукову рядку http://localhost:4000/books і отримуємо масив з інформацією про книжки.  
// 8. Для перевірки get-запитів ми прописуємо у браузері потрібну адресу, але з post-запитами так не прокатить. Тому використовуємо Postman. 
// 9. У postman прописуємо http://localhost:4000/books і натискаємо send. Отримуємо теж самі дані у форматі json. Також перевіряємо заголовки application/json; charset=utf-8 то все ок. 
// 10. При роботі з json-форматом краще використовувувати не метод send(), а json() => res.json(books); 
Це пов'язано з тим, що бази данних іноді присилають відповідь у вигляді null і метод json() корректніше обробляють відповідь
const databaseResponse = null; - імітація відповіді бази даних
res.json(databaseResponse); 
res.send(databaseResponse);  


<!-- Робота з middlewere express-example-3  -->
1. Імпортуємо books-файл => const books = require("./books");. 
2. Імпортуємо express з express => const express = require('express');
3. Для того щоб створити wep-сервер потрібно виклакити функцію express => const app = express(); 
4. Потім викликаємо метод в який передаємо першим аргументом назву порта 4000, а другим колбек функцію для того, щоб переконатися у його роботі. => app.listen(4000);
5. npm start =>))
6. Імітуємо різні маршрути =>
app.get("/products", (req, res) => {
    res.json([]);
});

app.get("/books", (req, res) => {
    res.json(books);
});
7. Для додавання middlewere в express потрібно використати метод use(). У нього передати функцію (req, res, next) => {}) 
Вона буде спрацьовувати на будь який маршрут, але не запускати її виконання. Для запуску використовують третій аргумент - метод next(). В нього нічого не потрібно передавати. 
8. Може бути деківлька middlewere і вони будуть виконуватися почергово. 
app.use((req, res, next) => {
    console.log('First middlewere');
    next();
});

app.use((req, res, next) => {
    console.log('Second middlewere');
    next();
}); 

Зачастую даний підхід використовують, наприклад, при публічних та приватних маршрутах. Наприклад, логування. У папці public є документ server.log у якому записані усі публічні запити, коли вони відбулися. А для цього потрібно створити відповідні middlewere. 
8.1 Завантажуєпа пакет для створення інформації у потрібному форматі. => npm i moment 
8.2 Імпортуємо зміну moment з moment => const moment = require("moment");
8.3 Отримуємо данні про метод та адресу з req => const { url, method } = req;  
8.4 Отримуємо дані про дату та час коли відбулася подія. => const data = moment().format("DD-MM-YYYY_hh:mm:ss");
8.5 Для того, щоб додати запис у server.log потрібно використати метод appendFile.
8.5.1 Імпортуємо fs з fs/promises => const fs = require("node:fs/promises"); 
8.5.2 Для відправки нам потрібно використовувати асихрону функцію і await fs.appendFile("./public/server.log", `\n${method} ${url} ${date}`); де "./public/server.log" - це шлях до файлу в який хочемо записати, \n - для переносу кожної наступного запису на рядок нижче.  

9. Middlewere для не існуючої сторінки. Нам у відповідь приходить повідомлення 404 Not Found з HTML-розміткою. Так як це стандартна відповідь експресу. Бажано її замінити. 
9.1 app.use((req, res) => {
    res.status(404).json({
        message: "404 Not Found"
    })
})

<!-- Помилка. Запит заблоковано за політикої корс-->
1. Встановити пакет cors => npm i cros. 
2. Імпортуємо cors => const cors = require('cors'); 
3. Вкликаємо її. Нам повертається middlewere аналогічна тій, що ми робили запис у файл servre.log (пункт 8) => const corsMiddleware = cors();   app.use(corsMiddleware);