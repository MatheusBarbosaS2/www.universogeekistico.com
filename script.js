const OWNER = 'MatheusBarbosaS2'; // Nome de usuário do GitHub
const REPO = 'www.universogeekistico.com'; // Nome do repositório
const FILE_PATH = 'posts.json'; // Caminho do arquivo no repositório
const BRANCH = 'main'; // Nome da branch, geralmente 'main' ou 'master'
const TOKEN = 'ghp_11AZNTFVY0QqdpY7Kjq1ey_AonMY9QpqTnIxhgW5nLpH0jip4pd0z9cL1CMpeS2DOR6OJUEBBOaECEG3j5'; // Seu token de autenticação

const API_URL = `https://api.github.com/repos/MatheusBarbosaS2/www.universogeekistico.com/contents/posts.json`;

// Buscar conteúdo JSON do GitHub
async function fetchPosts() {
  try {
    const res = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: 'application/vnd.github.v3+json'
      }
    });

    const data = await res.json();
    const content = atob(data.content);
    const sha = data.sha;
    return { posts: JSON.parse(content), sha };
  } catch (error) {
    console.error("Erro ao buscar posts do GitHub:", error);
    return { posts: [], sha: null };
  }
}

// Salvar conteúdo JSON no GitHub
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

async function atualizarListaDePosts() {
  const select = document.getElementById('select-post');
  if (!select) return;

  const { posts } = await fetchPosts();
  select.innerHTML = '<option value="">Selecione um título...</option>';

  posts.forEach((post, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = post.titulo;
    select.appendChild(option);
  });
}

async function exibirPosts() {
  const container = document.getElementById('noticias-container');
  if (!container) return;

  container.innerHTML = '';
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

window.onload = function () {
  atualizarListaDePosts();
  exibirPosts();
};

// Formulário de postagem
const form = document.getElementById('form-postagem');
if (form) {
  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const conteudo = document.getElementById('conteudo').value;
    const imagemInput = document.getElementById('imagem');
    const imagem = imagemInput.files[0];

    if (!titulo || !autor || !conteudo || !imagem) {
      alert("Preencha todos os campos e selecione uma imagem.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async function () {
      const imagemBase64 = reader.result;

      const novaPostagem = {
        titulo,
        autor,
        conteudo,
        imagem: imagemBase64,
        data: new Date().toLocaleString()
      };

      const { posts, sha } = await fetchPosts();
      posts.unshift(novaPostagem);
      await savePosts(posts, sha);

      alert('Notícia publicada com sucesso!');
      form.reset();
      atualizarListaDePosts();
      exibirPosts();
    };

    reader.readAsDataURL(imagem);
  });
}

// Botão de excluir
const btnExcluir = document.getElementById('excluir-post');
if (btnExcluir) {
  btnExcluir.addEventListener('click', async function () {
    const select = document.getElementById('select-post');
    const index = select.value;

    if (index === "") {
      alert("Selecione uma postagem para excluir.");
      return;
    }

    const { posts, sha } = await fetchPosts();
    const postRemovido = posts.splice(index, 1);
    await savePosts(posts, sha);

    alert(`Postagem "${postRemovido[0].titulo}" foi excluída com sucesso!`);
    atualizarListaDePosts();
    exibirPosts();
  });
}
