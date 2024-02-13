import { nanoid } from "nanoid";
import fs  from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contactsPath = path.join(__dirname, "db", "contacts.json")

export async function listContact() {
    const data = await fs.readFile(contactsPath);
    
    return JSON.parse(data);
};

export async function getContactById(contactId) {
    const contacts = await listContact();

    const result = contacts.find(el => el.id === contactId);

    return result || null; 
};

export async function addContact(data) {
    const contacts = await listContact();

    const newContact = {
        id: nanoid(),
        ...data,
    };
    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return newContact;
} 

export async function removeContact(contactId) {
    const contacts = await listContact();

    const index = contacts.findIndex(el => el.id === contactId);
    if (index === -1) return null;

    const [result] = contacts.slice(index, 1);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return result;
}

export async function updateById(contactId, data) {
    const contacts = await listContact();

    const index = contacts.findIndex(el => el.id === contactId);
    if (index === -1) return null;
    
    contacts[index] = { id: contactId, ...data };

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))

    return contacts[index];
}
