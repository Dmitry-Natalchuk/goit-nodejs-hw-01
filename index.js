const {
  listContacts,
  addContact,
  removeContact,
  getContactById,
} = require('./contacts');

const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contactsList = await listContacts();
      console.table(contactsList);
      break;

    case 'get':
      const contact = await getContactById(id);
      console.table(contact);
      break;

    case 'add':
      const addUserContact = await addContact(name, email, phone);
      console.table(addUserContact);
      break;

    case 'remove':
      const removUserContact = await removeContact(id);
      console.table(removUserContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
