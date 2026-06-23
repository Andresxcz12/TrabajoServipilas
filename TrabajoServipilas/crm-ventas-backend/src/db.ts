import 'dotenv/config';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL || process.env.PG_CONNECTION_STRING || 'postgresql://crm_user:secret@localhost:5432/crm';

export const pool = new Pool({ connectionString });

pool.on('error', (err) => {
  console.error('Unexpected error on idle Postgres client', err);
});

export async function query(text: string, params?: any[]) {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('executed query', { text, duration, rows: res.rowCount });
  return res;
}

export default pool;
