const { program } = require("commander");

//my code

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./src/db/contacts");

//end of my code

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      console.log(allContacts);
      break;

    case "get":
      const contact = await getContactById(id);
      console.log(contact);
      break;

    case "add":
      const newContact = await addContact({ name, email, phone });
      console.log(newContact);
      break;

    case "remove":
      const removedContact = await removeContact(id);
      console.log(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

// invokeAction({ action: "listContacts" });
// invokeAction({ action: "getContactById", id: "05olLMgyVQdWRwgKfg5J6" });
// invokeAction({
//   action: "addContact",
//   name: "Luis",
//   phone: "12345",
//   email: "hh@gmail.com",
// });
// invokeAction({
//   action: "removeContact",
//   id: "Z5sbDlS7pCzNsnAHLtDJd",
// });

invokeAction(options);
