import { model, Schema } from "mongoose";
import { handleMongooseError } from "../helpers/handleMongooseError.js";

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    }
}); 

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

export default Contact;