import crypto from 'crypto';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const KEY = crypto.scryptSync(process.env.ENCRYPTION_KEY || 'chave_padrao_muito_segura_123', 'salt', 32);
const ALGO = 'aes-256-cbc';

export class SecurityService {
    encrypt(text) {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(ALGO, KEY, iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return `${iv.toString('hex')}:${encrypted}`;
    }

    async hashPassword(password) {
        return await bcrypt.hash(password, 10);
    }

    async comparePassword(plain, hash) {
        return await bcrypt.compare(plain, hash);
    }

    generateBlindIndex(email) {
        // Isso permite buscar o email no banco sem saber qual é o email
        return crypto.createHmac('sha256', KEY).update(email).digest('hex');
    }
}