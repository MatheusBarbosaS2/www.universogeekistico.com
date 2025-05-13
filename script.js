const OWNER = 'MatheusBarbosaS2'; // Nome de usuário do GitHub
const REPO = 'www.universogeekistico.com'; // Nome do repositório
const FILE_PATH = 'posts.json'; // Caminho do arquivo no repositório
const BRANCH = 'main'; // Nome da branch, geralmente 'main' ou 'master'
const TOKEN = 'SEU_TOKEN_AQUI'; // Substitua pelo seu token de autenticação

const API_URL = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}?ref=${BRANCH}`;

// Função para buscar as postagens do GitHub
async function fetchPosts() {
  try {
    const res = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: 'application/vnd.github.v3+json'
      }
    });

    const data = await res.json();
    const content = atob(data.content); // Decodifica o conteúdo Base64
    const sha = data.sha; // Sha do arquivo JSON para atualização posterior
    return { posts: JSON.parse(content), sha };
  } catch (error) {
    console.error("Erro ao buscar posts do GitHub:", error);
    return { posts: [], sha: null };
  }
}

// Função para salvar as postagens de volta no GitHub
async function savePosts(posts, sha) {
  try {
    const res = await fetch(API_URL, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: 'application/vnd.github.v3+json'
      },
      body: JSON.stringify({
        message: 'Atualizando posts via site',
        content: btoa(JSON.stringify(posts, null, 2)),
        sha,
        branch: BRANCH
      })
    });

    return await res.json();
  } catch (error) {
    console.error("Erro ao salvar posts no GitHub:", error);
  }
}

// Função para expandir o conteúdo da postagem
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

// Função para exibir as postagens na página
async function exibirPosts() {
  const container = document.getElementById('noticias-container');
  if (!container) return;

  container.innerHTML = ''; // Limpa o conteúdo anterior
  const { posts } = await fetchPosts();

  posts.forEach((post, index) => {
    const div = document.createElement('div');
    div.className = 'noticia';

    const h2 = document.createElement('h2');
    h2.textContent = post.titulo;

    const img = document.createElement('img');
    img.src = post.imagem;
    img.alt = post.titulo;

    const autor = document.createElement('p');
    autor.className = 'autor';
    autor.textContent = `Por ${post.autor} - ${post.data || 'Data desconhecida'}`;

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

// Chama a função ao carregar a página
window.onload = function () {
  exibirPosts();
};
