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

// Função para exibir as postagens salvas no localStorage
function exibirPosts() {
  const container = document.getElementById('noticias-container');
  if (!container) {
    console.warn("⚠️ Container 'noticias-container' não encontrado no HTML.");
    return;
  }

  container.innerHTML = ''; // Limpa antes de adicionar novamente

  const posts = JSON.parse(localStorage.getItem('posts')) || [];

  if (posts.length === 0) {
    container.innerHTML = "<p style='text-align:center;'>Nenhuma notícia disponível no momento.</p>";
    return;
  }

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

// Lidar com envio do formulário de nova postagem
document.getElementById('form-postagem')?.addEventListener('submit', function (e) {
  e.preventDefault();

  const titulo = document.getElementById('titulo').value.trim();
  const autor = document.getElementById('autor').value.trim();
  const conteudo = document.getElementById('conteudo').value.trim();
  const inputImagem = document.getElementById('imagem');
  const data = new Date().toLocaleDateString('pt-BR');

  if (!titulo || !autor || !conteudo || !inputImagem.files[0]) {
    alert('Preencha todos os campos!');
    return;
  }

  const fileReader = new FileReader();

  fileReader.onload = function (event) {
    const imagemBase64 = event.target.result;

    const novaPostagem = { titulo, autor, imagem: imagemBase64, conteudo, data };

    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.unshift(novaPostagem);

    localStorage.setItem('posts', JSON.stringify(posts));

    alert('✅ Postagem publicada com sucesso!');
    window.location.reload();
  };

  fileReader.readAsDataURL(inputImagem.files[0]); // Converte a imagem para base64
});

// Carrega os posts ao abrir a página
window.onload = () => {
  console.log("🚀 Página carregada, chamando exibirPosts()");
  exibirPosts();
};
