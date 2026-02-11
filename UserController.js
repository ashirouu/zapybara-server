import { pool } from './db.js';
import { SecurityService } from './SecurityService.js';

export class UserController {
    constructor() {
        this.security = new SecurityService();
    }

    async register(req, res) {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ error: "Dados incompletos" });

        const blindIndex = this.security.generateBlindIndex(email);
        const encryptedEmail = this.security.encrypt(email);
        const passwordHash = await this.security.hashPassword(password);

        try {
            await pool.query(
                'INSERT INTO users (blind_index, encrypted_email, password_hash) VALUES ($1, $2, $3)',
                [blindIndex, encryptedEmail, passwordHash]
            );
            res.json({ success: true, msg: "Bem-vindo à manada!" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Usuário já existe ou erro no servidor." });
        }
    }

    async login(req, res) {
        const { email, password } = req.body;
        const blindIndex = this.security.generateBlindIndex(email);

        try {
            const result = await pool.query('SELECT * FROM users WHERE blind_index = $1', [blindIndex]);
            if (result.rows.length === 0) return res.status(401).json({ error: "Capivara não encontrada." });

            const user = result.rows[0];
            const match = await this.security.comparePassword(password, user.password_hash);

            if (match) {
                // Token simples para o MVP. Em produção usaremos JWT.
                const token = this.security.encrypt(`${user.id}:${Date.now()}`);
                res.json({ success: true, token: token, plan: user.plan });
            } else {
                res.status(401).json({ error: "Senha errada!" });
            }
        } catch (error) {
            res.status(500).json({ error: "Erro interno" });
        }
    }
}