import express from 'express';
import cors from 'cors';
import { UserController } from './UserController.js';

// --- CORREÇÃO MÁGICA DO IPV6 ---
// Isso obriga o servidor a usar o endereço IPv4 antigo, que funciona no Render
import dns from 'node:dns';
try {
    if (dns.setDefaultResultOrder) {
        dns.setDefaultResultOrder('ipv4first');
    }
} catch (e) {
    console.log("Aviso: Node antigo, pulando ajuste de DNS.");
}
// -------------------------------

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST']
}));

app.use(express.json());

const userController = new UserController();

// Rota de teste
app.get('/', (req, res) => {
    res.send('Zapybara API está online e rodando! 🌿');
});

// Rotas de Usuário
app.post('/register', (req, res) => userController.register(req, res));
app.post('/login', (req, res) => userController.login(req, res));

app.listen(PORT, () => {
    console.log(`🔥 Zapybara Server rodando na porta ${PORT}`);
});
