// Função para carregar e exibir postagens
function carregarPostagens() {
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  const selectPost = document.getElementById('select-post');

  // Limpa o select antes de adicionar as opções
  selectPost.innerHTML = '<option value="">Selecione um título...</option>';

  // Adiciona as postagens no select
  posts.forEach((post, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = post.titulo;
    selectPost.appendChild(option);
  });

  // Exibe as postagens na tela
  const listaPostagens = document.getElementById('lista-postagens');
  listaPostagens.innerHTML = ''; // Limpa a lista antes de adicionar novos posts

  posts.forEach((post) => {
    const postagemElement = document.createElement('div');
    postagemElement.classList.add('postagem');
    postagemElement.innerHTML = `
      <h2>${post.titulo}</h2>
      <p><strong>Autor:</strong> ${post.autor}</p>
      <p><strong>Data:</strong> ${post.data}</p>
      <img src="${post.imagem}" alt="Imagem da postagem" class="imagem-postagem">
      <p>${post.conteudo}</p>
    `;
    listaPostagens.appendChild(postagemElement);
  });
}

// Função para salvar nova postagem
document.getElementById('form-postagem')?.addEventListener('submit', function (e) {
  e.preventDefault();

  const titulo = document.getElementById('titulo').value.trim();
  const autor = document.getElementById('autor').value.trim();
  const imagemUrl = document.getElementById('imagem').value.trim();
  const conteudo = document.getElementById('conteudo').value.trim();
  const data = new Date().toLocaleDateString('pt-BR');

  if (!titulo || !autor || !imagemUrl || !conteudo) {
    alert('Preencha todos os campos!');
    return;
  }

  // Função para verificar se a URL da imagem é válida
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  if (!isValidUrl(imagemUrl)) {
    alert('Por favor, insira uma URL de imagem válida.');
    return;
  }

  // Cria um novo objeto de postagem
  const novaPostagem = { titulo, autor, imagem: imagemUrl, conteudo, data };

  // Recupera as postagens armazenadas e adiciona a nova postagem
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  posts.unshift(novaPostagem); // Adiciona a nova postagem no começo da lista
  localStorage.setItem('posts', JSON.stringify(posts));

  alert('✅ Postagem publicada com sucesso!');
  window.location.reload(); // Atualiza a página para mostrar a nova postagem
});

// Função para excluir postagem
document.getElementById('excluir-post')?.addEventListener('click', function () {
  const selectPost = document.getElementById('select-post');
  const indexPost = selectPost.value;

  if (indexPost === '') {
    alert('Selecione uma postagem para excluir.');
    return;
  }

  const posts = JSON.parse(localStorage.getItem('posts'));
  posts.splice(indexPost, 1); // Remove a postagem selecionada

  localStorage.setItem('posts', JSON.stringify(posts));
  alert('✅ Postagem excluída com sucesso!');
  window.location.reload(); // Atualiza a página para refletir a exclusão
});

// Carrega as postagens ao iniciar a página
window.onload = carregarPostagens;
