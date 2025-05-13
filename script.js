// Função para carregar posts a partir de um arquivo JSON
function carregarPostsDeArquivo() {
  fetch('posts.json')
    .then(response => response.json())
    .then(posts => {
      if (posts && Array.isArray(posts)) {
        localStorage.setItem('posts', JSON.stringify(posts));
        exibirPosts(); // Exibe os posts depois de carregá-los
      }
    })
    .catch(error => {
      console.error('Erro ao carregar os posts:', error);
    });
}

// Exibe os posts no container
function exibirPosts() {
  const container = document.getElementById('noticias-container');
  if (!container) return;

  container.innerHTML = '';

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
    img.src = post.imagem.startsWith('data:image') ? post.imagem : post.imagem;
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
    btn.onclick = () => expandirConteudo(pId, btn.id);

    div.appendChild(h2);
    div.appendChild(img);
    div.appendChild(autor);
    div.appendChild(p);
    div.appendChild(btn);

    container.appendChild(div);
  });

  preencherSelectDeletar();
}

// Inicialização
window.onload = () => {
  console.log("🚀 Página carregada");
  carregarPostsDeArquivo();  // Carrega os posts de 'posts.json'
  criarBotoesExportarImportar();
};
