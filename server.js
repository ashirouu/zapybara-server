import express from 'express';
import cors from 'cors';
import { UserController } from './UserController.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração de segurança de quem pode chamar
app.use(cors({
    origin: '*', // Em produção, troque '*' pelos seus domínios (GitHub/Zapybara.com)
    methods: ['GET', 'POST']
}));

app.use(express.json());

const userController = new UserController();

// Rotas
app.post('/register', (req, res) => userController.register(req, res));
app.post('/login', (req, res) => userController.login(req, res));

app.listen(PORT, () => {
    console.log(`🔥 Zapybara Server rodando na porta ${PORT}`);
});