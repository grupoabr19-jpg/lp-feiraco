import { readFile } from 'node:fs/promises';
import { db } from './db.js';

const schemaUrl = new URL('../../../database/schema.sql', import.meta.url);
const schema = await readFile(schemaUrl, 'utf8');

try {
  await db.query(schema);
  console.log('Database schema is ready.');
} finally {
  await db.end();
}
