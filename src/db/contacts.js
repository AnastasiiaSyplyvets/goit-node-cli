const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve(__dirname, "contacts.json");

async function listContacts() {
  // ...твій код. Повертає масив контактів.

  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data.toString());
    return contacts;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  try {
    const contacts = await listContacts();

    const searchedContact = contacts.find((c) => c.id === contactId);
    return searchedContact || null;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((c) => c.id === contactId);
    if (index === -1) return null;
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return result;
  } catch (error) {
    console.log(error);
  }
}

async function addContact({ name, email, phone }) {
  try {
    const contacts = await listContacts();

    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
