// wFXsAU7m1gMHRYBb Пароль до бази
import mongoose from "mongoose";
import app from "./app";

const DB_HOST = "mongodb+srv://Maryna_Akil:wFXsAU7m1gMHRYBb@cluster0.v7clei7.mongodb.net/books_reader?retryWrites=true&w=majority";

mongoose.set('strictQuery', false);

mongoose.connect(DB_HOST)
    .then(() => console.log('Database connect success!'))
    .catch(error => console.log(error.message));