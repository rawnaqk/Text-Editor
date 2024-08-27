import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Method to add or update content in the database
export const putDb = async (content) => {
  console.log('Adding content to the database');
  const db = await openDB('jate', 1);
  await db.put('jate', { content });
  console.log('Content added to the database');
};

// Method to get all content from the database
export const getDb = async () => {
  console.log('Fetching content from the database');
  const db = await openDB('jate', 1);
  const allContent = await db.getAll('jate');
  console.log('Content fetched from the database', allContent);
  return allContent;
};

initdb();