const fs = require('fs').promises;
const path = require('path');
const shortid = require('shortid');

const contactsPath = path.join(__dirname, 'db/contacts.json');

async function listContacts() {
  try {
    const readFile = await fs.readFile(contactsPath);
    const items = JSON.parse(readFile);
    return items;
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const getIdContact = contacts.find(contact => contact.id === contactId);
    return getIdContact;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const removeContact = contacts.filter(contact => contact.id !== contactId);
    return removeContact;
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: shortid.generate(),
      name,
      email,
      phone,
    };
    const addContactList = [...contacts, newContact];
    return addContactList;
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
