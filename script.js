const BIN_ID = '682283338a456b79669c7e82';
const API_KEY = '$2a$10$iIvaKOYkYNNcxnN6z4mfgeXMBfjVB9qT.8s76CI3oJCRRhlFiV4T.';
const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;
const HEADERS = {
  'Content-Type': 'application/json',
  'X-Master-Key': API_KEY
};

async function fetchPosts() {
  try {
    const response = await fetch(BASE_URL + '/latest', { headers: HEADERS });
    const data = await response.json();
    return data.record || [];
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    return [];
  }
}

async function savePosts(posts) {
  try {
    await fetch(BASE_URL, {
      method: 'PUT',
      headers: HEADERS,
      body: JSON.stringify(posts)
    });
  } catch (error) {
    console.error("Erro ao salvar posts:", error);
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

  const posts = await fetchPosts();
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
  const posts = await fetchPosts();

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

      const postagem = {
        titulo,
        autor,
        conteudo,
        imagem: imagemBase64,
        data: new Date().toLocaleString()
      };

      const posts = await fetchPosts();
      posts.unshift(postagem);
      await savePosts(posts);

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

    const posts = await fetchPosts();
    const postRemovido = posts.splice(index, 1);
    await savePosts(posts);

    alert(`Postagem "${postRemovido[0].titulo}" foi excluída com sucesso!`);
    atualizarListaDePosts();
    exibirPosts();
  });
}
