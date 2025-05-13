const OWNER = 'MatheusBarbosaS2'; // Nome de usuário do GitHub
const REPO = 'www.universogeekistico.com'; // Nome do repositório
const FILE_PATH = 'posts.json'; // Caminho do arquivo no repositório
const BRANCH = 'main'; // Branch
const TOKEN = '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'; // Token GitHub

const API_URL = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}?ref=${BRANCH}`;

// Função para buscar as postagens do GitHub
async function fetchPosts() {
  try {
    console.log("🔄 Buscando posts do GitHub...");

    const res = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: 'application/vnd.github.v3+json'
      }
    });

    if (!res.ok) {
      throw new Error(`Erro na requisição: ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();

    if (!data.content) {
      throw new Error("❌ Conteúdo vazio ou inválido no arquivo JSON.");
    }

    const content = atob(data.content); // Base64 → texto
    const sha = data.sha; // Para edições futuras

    const parsedPosts = JSON.parse(content);

    console.log("✅ Posts carregados com sucesso:", parsedPosts);
    return { posts: parsedPosts, sha };
  } catch (error) {
    console.error("🚨 Erro ao buscar posts do GitHub:", error);
    return { posts: [], sha: null };
  }
}

// Função para exibir as postagens na página
async function exibirPosts() {
  const container = document.getElementById('noticias-container');

  if (!container) {
    console.warn("⚠️ Container 'noticias-container' não encontrado no HTML.");
    return;
  }

  container.innerHTML = ''; // Limpa qualquer conteúdo anterior

  const { posts } = await fetchPosts();

  if (!posts || posts.length === 0) {
    container.innerHTML = "<p style='text-align:center;'>Nenhuma notícia disponível no momento.</p>";
    return;
  }

  posts.forEach((post, index) => {
    const div = document.createElement('div');
    div.className = 'noticia';

    const h2 = document.createElement('h2');
    h2.textContent = post.titulo || "Sem título";

    const img = document.createElement('img');
    img.src = post.imagem || "imagem/sem-imagem.jpg";
    img.alt = post.titulo || "Imagem da notícia";

    const autor = document.createElement('p');
    autor.className = 'autor';
    autor.textContent = `Por ${post.autor || "Desconhecido"} - ${post.data || 'Data desconhecida'}`;

    const p = document.createElement('p');
    const pId = `conteudoPostagem${index}`;
    p.id = pId;
    p.setAttribute('data-fulltext', post.conteudo);
    p.textContent = post.conteudo.slice(0, 100) + "...";

    const btn = document.createElement('button');
    btn.textContent = "Saiba Mais";
    btn.id = `botaoPostagem${index}`;
    btn.onclick = function () {
      expandirConteudo(pId, btn.id);
    };

    div.appendChild(h2);
    div.appendChild(img);
    div.appendChild(autor);
    div.appendChild(p);
    div.appendChild(btn);

    container.appendChild(div);
  });
}

// Função para expandir ou esconder o conteúdo do post
function expandirConteudo(idParagrafo, idBotao) {
  const p = document.getElementById(idParagrafo);
  const btn = document.getElementById(idBotao);
  const textoCompleto = p.getAttribute('data-fulltext');

  if (btn.innerText === "Saiba Mais") {
    p.textContent = textoCompleto;
    btn.innerText = "Mostrar Menos";
  } else {
    p.textContent = textoCompleto.slice(0, 100) + "...";
    btn.innerText = "Saiba Mais";
  }
}

// Função para salvar os posts atualizados no GitHub
async function savePosts(novosPosts, shaAtual) {
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`;

  const novoConteudoBase64 = btoa(JSON.stringify(novosPosts, null, 2));

  const body = {
    message: '📰 Nova postagem adicionada via site',
    content: novoConteudoBase64,
    sha: shaAtual,
    branch: BRANCH
  };

  try {
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      throw new Error(`Erro ao salvar: ${res.status} - ${res.statusText}`);
    }

    console.log("✅ Postagem salva com sucesso no GitHub!");
  } catch (error) {
    console.error("❌ Erro ao salvar postagem:", error);
  }
}

// Lidar com envio do formulário de nova postagem
document.getElementById('form-postagem')?.addEventListener('submit', async function (e) {
  e.preventDefault();

  const titulo = document.getElementById('titulo').value.trim();
  const autor = document.getElementById('autor').value.trim();
  const imagem = document.getElementById('imagem').value.trim();
  const conteudo = document.getElementById('conteudo').value.trim();
  const data = new Date().toLocaleDateString('pt-BR');

  if (!titulo || !autor || !imagem || !conteudo) {
    alert('Preencha todos os campos!');
    return;
  }

  const novaPostagem = { titulo, autor, imagem, conteudo, data };

  const { posts, sha } = await fetchPosts();

  posts.unshift(novaPostagem); // Adiciona a nova postagem no início

  await savePosts(posts, sha);

  alert('✅ Postagem publicada com sucesso!');
  window.location.reload(); // Recarrega a página para mostrar o novo post
});

// Carrega os posts ao abrir a página
window.onload = () => {
  console.log("🚀 Página carregada, chamando exibirPosts()");
  exibirPosts();
};
