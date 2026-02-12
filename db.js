import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Criar a conexão com o banco usando a DATABASE_URL do Render
export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

console.log("🐘 Conexão com o banco (via Pooler) configurada!");
