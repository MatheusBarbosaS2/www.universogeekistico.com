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
  
  window.onload = function () {
    atualizarListaDePosts();
  
    const container = document.getElementById('noticias-container');
    if (!container) return;
  
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
  
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
      btn.setAttribute("onclick", `expandirConteudo('${pId}', '${btn.id}')`);
  
      div.appendChild(h2);
      div.appendChild(img);
      div.appendChild(autor);
      div.appendChild(p);
      div.appendChild(btn);
  
      container.appendChild(div);
    });
  };
  
  // Formulário de postagem
  const form = document.getElementById('form-postagem');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const titulo = document.getElementById('titulo').value;
      const autor = document.getElementById('autor').value;
      const conteudo = document.getElementById('conteudo').value;
      const imagemInput = document.getElementById('imagem');
      const imagem = imagemInput.files[0];
  
      const reader = new FileReader();
      reader.onload = function () {
        const imagemBase64 = reader.result;
  
        const postagem = {
          titulo,
          autor,
          conteudo,
          imagem: imagemBase64,
          data: new Date().toLocaleString()
        };
  
        let posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.unshift(postagem);
        localStorage.setItem('posts', JSON.stringify(posts));
  
        alert('Notícia publicada com sucesso!');
        form.reset();
        atualizarListaDePosts();
      };
  
      if (imagem) {
        reader.readAsDataURL(imagem);
      }
    });
  }
  
  // Atualizar <select> com postagens
  function atualizarListaDePosts() {
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
  
  // Excluir postagem
  const btnExcluir = document.getElementById('excluir-post');
  if (btnExcluir) {
    btnExcluir.addEventListener('click', function () {
      const select = document.getElementById('select-post');
      const index = select.value;
  
      if (index === "") {
        alert("Selecione uma postagem para excluir.");
        return;
      }
  
      let posts = JSON.parse(localStorage.getItem('posts')) || [];
      const postRemovido = posts.splice(index, 1);
      localStorage.setItem('posts', JSON.stringify(posts));
  
      alert(`Postagem "${postRemovido[0].titulo}" foi excluída com sucesso!`);
      atualizarListaDePosts();
    });
  }
  
