import pg from 'pg';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente se estiver rodando localmente
dotenv.config();

const { Pool } = pg;

// Cria a conexão com o banco
// O "ssl: { rejectUnauthorized: false }" é OBRIGATÓRIO para o Supabase funcionar no Render
export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});