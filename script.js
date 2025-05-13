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

// Salva nova postagem
document.getElementById('form-postagem')?.addEventListener('submit', function (e) {
  e.preventDefault();

  const titulo = document.getElementById('titulo').value.trim();
  const autor = document.getElementById('autor').value.trim();
  const imagemInput = document.getElementById('imagem');
  const conteudo = document.getElementById('conteudo').value.trim();
  const data = new Date().toLocaleDateString('pt-BR');

  if (!titulo || !autor || !imagemInput.files[0] || !conteudo) {
    alert('Preencha todos os campos!');
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const imagemBase64 = reader.result;
    const novaPostagem = { titulo, autor, imagem: imagemBase64, conteudo, data };
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.unshift(novaPostagem);
    localStorage.setItem('posts', JSON.stringify(posts));
    alert('✅ Postagem publicada com sucesso!');
    window.location.reload();
  };
  reader.readAsDataURL(imagemInput.files[0]);
});

// Preenche o <select> com os títulos para exclusão
function preencherSelectDeletar() {
  const select = document.getElementById('select-post');
  if (!select) return;

  select.innerHTML = '<option value="">Selecione um título...</option>';
  const posts = JSON.parse(localStorage.getItem('posts')) || [];

  posts.forEach((post, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = post.titulo;
    select.appendChild(option);
  });
}

// Excluir postagem selecionada
document.getElementById('excluir-post')?.addEventListener('click', function () {
  const select = document.getElementById('select-post');
  const index = select.value;

  if (index === "") {
    alert('Selecione uma postagem para excluir.');
    return;
  }

  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  posts.splice(index, 1);
  localStorage.setItem('posts', JSON.stringify(posts));
  alert('🗑️ Postagem excluída com sucesso!');
  window.location.reload();
});

// Exportar posts para arquivo JSON
function exportarPosts() {
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  const blob = new Blob([JSON.stringify(posts, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'posts_exportados.json';
  a.click();

  URL.revokeObjectURL(url);
}

// Importar posts de um arquivo JSON
function importarPosts(evento) {
  const arquivo = evento.target.files[0];
  if (!arquivo) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const novosPosts = JSON.parse(e.target.result);
      if (Array.isArray(novosPosts)) {
        const postsAtuais = JSON.parse(localStorage.getItem('posts')) || [];
        const combinados = [...novosPosts, ...postsAtuais];
        localStorage.setItem('posts', JSON.stringify(combinados));
        alert('📥 Importação concluída com sucesso!');
        window.location.reload();
      } else {
        throw new Error("Formato de arquivo inválido.");
      }
    } catch (err) {
      alert('❌ Erro ao importar: ' + err.message);
    }
  };
  reader.readAsText(arquivo);
}

// Cria os botões de exportar/importar no final do formulário
function criarBotoesExportarImportar() {
  const form = document.getElementById('form-postagem');
  if (!form) return;

  const exportBtn = document.createElement('button');
  exportBtn.type = 'button';
  exportBtn.textContent = '📤 Exportar Posts';
  exportBtn.onclick = exportarPosts;

  const importInput = document.createElement('input');
  importInput.type = 'file';
  importInput.accept = '.json';
  importInput.style.marginTop = '10px';
  importInput.onchange = importarPosts;

  form.appendChild(document.createElement('hr'));
  form.appendChild(exportBtn);
  form.appendChild(document.createElement('br'));
  form.appendChild(importInput);
}

// Inicialização
window.onload = () => {
  console.log("🚀 Página carregada");
  exibirPosts();
  criarBotoesExportarImportar();
};
