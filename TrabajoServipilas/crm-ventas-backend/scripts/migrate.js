require('dotenv').config();
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || process.env.PG_CONNECTION_STRING || 'postgresql://crm_user:secret@localhost:5432/crm';
const pool = new Pool({ connectionString });

async function migrate() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS pedidos (
        id SERIAL PRIMARY KEY,
        fechaCreacion TEXT,
        fechaVenta TEXT,
        usuario TEXT,
        email TEXT,
        telefono TEXT,
        direccion TEXT,
        tienda TEXT,
        idRepartidor TEXT,
        producto TEXT,
        descripcion TEXT,
        sku TEXT,
        idProducto TEXT,
        unidad INTEGER,
        precioUnitario NUMERIC,
        pagoTotal NUMERIC,
        ciudad TEXT,
        created_at TIMESTAMP DEFAULT now()
      );
    `);
    console.log('Migration completed');
  } catch (err) {
    console.error('Migration failed', err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();
