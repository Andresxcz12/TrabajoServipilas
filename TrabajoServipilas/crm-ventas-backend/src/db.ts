import 'dotenv/config';
import { Pool } from 'pg';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle Postgres client', err);
});

export async function query(text: string, params?: any[]) {
  return pool.query(text, params);
}