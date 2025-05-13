const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000;

// 👉 Coloque aqui seu token do GitHub
const TOKEN = 'ghp_...'; // <-- Substitua pelo seu token

// 👉 Repositório e arquivo de destino
const API_URL = 'https://api.github.com/repos/MatheusBarbosaS2/www.universogeekistico.com/contents/posts.json';
const BRANCH = 'main';

app.use(express.json({ limit: '10mb' }));

// Endpoint para publicar
app.post('/publicar', async (req, res) => {
  try {
    const novaPostagem = req.body;

    // 1. Buscar o posts.json atual
    const get = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: 'application/vnd.github.v3+json'
      }
    });
    const data = await get.json();
    const sha = data.sha;
    const posts = JSON.parse(Buffer.from(data.content, 'base64').toString());

    // 2. Adicionar a nova postagem
    posts.unshift(novaPostagem);

    // 3. Enviar de volta ao GitHub
    const resultado = await fetch(API_URL, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: 'application/vnd.github.v3+json'
      },
      body: JSON.stringify({
        message: 'Adicionando nova postagem via backend',
        content: Buffer.from(JSON.stringify(posts, null, 2)).toString('base64'),
        sha,
        branch: BRANCH
      })
    });

    const resposta = await resultado.json();
    res.json(resposta);
  } catch (erro) {
    console.error('Erro ao publicar:', erro);
    res.status(500).json({ erro: 'Falha ao publicar a notícia.' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
