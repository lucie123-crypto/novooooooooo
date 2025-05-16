// server.js unificado
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = 3006; // Porta única para o servidor unificado

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com o banco de dados
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "login_db",
});

db.connect((err) => {
    if (err) {
        console.error("Erro ao conectar no banco de dados:", err.message);
        process.exit(1);
    }
    console.log("Conectado ao banco de dados MySQL.");
});

// ---------------- ROTAS DE USUÁRIO ----------------

// Cadastro de usuário
app.post("/register", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Usuário e senha são obrigatórios" });
    }

    const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            console.error("Erro ao registrar usuário:", err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Usuário registrado com sucesso!" });
    });
});

// Login de usuário
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    db.query(sql, [username, password], (err, results) => {
        if (err) {
            console.error("Erro ao realizar login:", err.message);
            return res.status(500).json({ error: err.message });
        }
        if (results.length > 0) {
            res.json({ message: "Login bem-sucedido!" });
        } else {
            res.status(401).json({ message: "Credenciais inválidas!" });
        }
    });
});

// Lista de usuários
app.get("/users", (req, res) => {
    const sql = "SELECT id, username FROM users";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Erro ao obter usuários:", err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// ---------------- ROTAS DE CONTATO ----------------

// Cadastro de contato
app.post("/contato", (req, res) => {
    const { nome, numero, email, mensagem } = req.body;

    if (!nome || !numero || !email || !mensagem) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    const sql = "INSERT INTO contato (nome, email, numero, mensagem) VALUES (?, ?, ?, ?)";
    db.query(sql, [nome, email, numero, mensagem], (err, result) => {
        if (err) {
            console.error("Erro ao registrar contato:", err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Contato registrado com sucesso!" });
    });
});

// Lista de contatos
app.get("/contato", (req, res) => {
    const sql = "SELECT * FROM contato ORDER BY data_envio DESC";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Erro ao buscar contatos:", err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// ---------------- ROTAS DE PET ----------------

// Cadastro de pet
app.post("/cadastro-pet", (req, res) => {
    const { name, email, "pet-name": petName, "pet-age": petAge, "pet-species": petSpecies, message } = req.body;

    if (!name || !email || !petName || !petAge || !petSpecies) {
        return res.status(400).json({ message: "Todos os campos obrigatórios devem ser preenchidos" });
    }

    const sql = `
        INSERT INTO cadastro_pet (nome, email, nome_pet, idade_pet, especie_pet, mensagem)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [name, email, petName, petAge, petSpecies, message || null], (err, result) => {
        if (err) {
            console.error("Erro ao registrar pet:", err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "A Mundo Pet agradece o seu contato! Consulta para testes rápidos registrada com sucesso." });
    });
});

// Lista de pets
app.get("/cadastro-pet", (req, res) => {
    const sql = "SELECT * FROM cadastro_pet ORDER BY id DESC";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Erro ao buscar cadastros de pets:", err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
