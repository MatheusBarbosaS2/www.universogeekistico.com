// ----------- FUNCIONALIDADE PARA NOTÍCIAS (Saiba mais) ---------------
if (window.location.pathname.includes("noticias.html")) {
  document.querySelectorAll('.noticia-content').forEach(conteudo => {
    const paragrafo = conteudo.querySelector('p');
    const textoCompleto = paragrafo.getAttribute('data-completo') || paragrafo.textContent;

    if (!paragrafo.getAttribute('data-completo')) {
      paragrafo.setAttribute('data-completo', textoCompleto);
    }

    let textoResumido = textoCompleto;
    if (textoCompleto.length > 100) {
      textoResumido = textoCompleto.substring(0, 100) + '...';
    }

    paragrafo.textContent = textoResumido;

    const botao = conteudo.querySelector('.saiba-mais');
    if (botao) {
      botao.addEventListener('click', () => {
        // Garantir que o botão 'Saiba mais' altera o texto corretamente
        if (botao.textContent === 'Saiba mais') {
          paragrafo.textContent = textoCompleto;
          botao.textContent = 'Mostrar menos';
        } else {
          paragrafo.textContent = textoResumido;
          botao.textContent = 'Saiba mais';
        }
      });
    }
  });
}

// ----------- FUNCIONALIDADE DO BOTÃO DE LIKE -------------------
document.querySelectorAll('.like-button').forEach(button => {
  const noticiaId = button.getAttribute('data-id');
  const countSpan = button.querySelector('.like-count');

  // Carrega os likes salvos no localStorage
  let storedLikes = parseInt(localStorage.getItem(`likes-${noticiaId}`)) || 0;
  let liked = localStorage.getItem(`liked-${noticiaId}`) === 'true';

  // Atualiza a interface inicial
  countSpan.textContent = storedLikes;
  if (liked) {
    button.classList.add('curtido');
    button.childNodes[0].textContent = '💖 Curtido ';
    button.style.opacity = 0.7;
  }

  // Adiciona o evento de clique no botão de like
  button.addEventListener('click', () => {
    // Evitar conflitos de evento entre os dois botões
    if (!liked) {
      storedLikes++;
      liked = true;
      button.classList.add('curtido');
      button.childNodes[0].textContent = '💖 Curtido ';
      button.style.opacity = 0.7;
    } else {
      storedLikes--;
      liked = false;
      button.classList.remove('curtido');
      button.childNodes[0].textContent = '❤️ Curtir ';
      button.style.opacity = 1;
    }

    // Atualiza o contador de likes
    countSpan.textContent = storedLikes;

    // Salva os dados no localStorage
    localStorage.setItem(`likes-${noticiaId}`, storedLikes);
    localStorage.setItem(`liked-${noticiaId}`, liked);
  });
});
