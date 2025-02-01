require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Configurar conexão com MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root", // Altere para seu usuário do MySQL
    password: "laerte334", // Altere se tiver senha
    database: "entershop",
});

db.connect(err => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err);
        return;
    }
    console.log("Conectado ao banco de dados MySQL!");
});

// Rota de cadastro de usuário
app.post("/register", (req, res) => {
    const { nome, email, senha } = req.body;
    const hash = bcrypt.hashSync(senha, 10); // Criptografa a senha

    db.query("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)", [nome, email, hash], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Erro ao cadastrar usuário" });
        }
        res.json({ message: "Usuário cadastrado com sucesso!" });
    });
});

// Rota de login
app.post("/login", (req, res) => {
    const { email, senha } = req.body;

    db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).json({ message: "Usuário não encontrado" });
        }

        const usuario = results[0];
        if (!bcrypt.compareSync(senha, usuario.senha)) {
            return res.status(401).json({ message: "Senha incorreta" });
        }

        res.json({ message: "Login bem-sucedido!", usuario });
    });
});

// Iniciar servidor
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
