const fs = require('fs').promises;
const path = require('path');
const shortid = require('shortid');

const contactsPath = path.resolve(__filename, './db/contacts.json');

function listContacts() {
  try {
    const readFile = fs.readFile(contactsPath);
    const items = JSON.parse(readFile);
    return items;
  } catch (error) {
    console.log(error.message);
  }
}

function getContactById(contactId) {
  try {
    const contacts = listContacts();
    const getIdContact = contacts.some(contact => contact.id === contactId);
    return getIdContact;
  } catch (error) {
    console.log(error.message);
  }
}

function removeContact(contactId) {
  try {
    const contacts = listContacts();
    const removeContact = contacts.filter(contact => contact.id !== contactId);
    return removeContact;
  } catch (error) {
    console.log(error.message);
  }
}

function addContact(name, email, phone) {
  try {
    const contacts = listContacts();
    const newContact = {
      id: shortid.generate(),
      name: name,
      email: email,
      phone: phone,
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
