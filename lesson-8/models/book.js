import { model, Schema } from "mongoose";

import { handleMongooseError } from './../helpers/handleMongooseError.js';

export const genreList = ["computers", "programming", "computer science", "technology", "nonfiction", "technical reference", "software", "computers coding", "engineering"];

export const dateRegexp = /^\d{2}-\d{2}-\d{4}$/;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    favorite: {
        type: Boolean, 
        default: false,
    },
    genre: {
        type: String,
        enum: genreList,
        required: true,
    },
    date: {
        type: String, //16-10-2009
        match: dateRegexp,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }
}, { versionKey: false, timestamps: true });

bookSchema.post("save", handleMongooseError);

const Book = model("book", bookSchema);

export default Book;