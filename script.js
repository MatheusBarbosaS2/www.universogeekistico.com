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

// ----------- MODAL PIX (funciona em qualquer página) ---------------

document.querySelectorAll('.comprar').forEach(botao => {
  botao.addEventListener('click', () => {
    const codigoPix = botao.getAttribute('data-pix');
    const qrCodePix = botao.getAttribute('data-qrcode');

    // Preenche os dados no modal
    document.getElementById('pix-codigo').value = codigoPix;

    const qrImage = document.getElementById('pix-qrcode');
    if (qrImage) {
      qrImage.src = qrCodePix;
    }

    // Exibe o modal
    document.getElementById('pix-modal').style.display = 'flex';
  });
});

// Botão para copiar o código PIX
const copiarBotao = document.getElementById('copiar-btn');
if (copiarBotao) {
  copiarBotao.addEventListener('click', copiarPix);
}

function copiarPix() {
  const codigo = document.getElementById('pix-codigo');
  if (!codigo) return;

  codigo.select();
  codigo.setSelectionRange(0, 99999); // Para dispositivos móveis

  try {
    document.execCommand('copy');
    alert('Código Pix copiado!');
  } catch (err) {
    alert('Erro ao copiar o código Pix.');
  }
}

// Botão para fechar o modal
const fecharBotao = document.getElementById('fechar-btn');
if (fecharBotao) {
  fecharBotao.addEventListener('click', fecharModal);
}

function fecharModal() {
  document.getElementById('pix-modal').style.display = 'none';
}

// ------------ BOTÃO DE LIKE -------------------
document.querySelectorAll('.like-button').forEach(button => {
  const noticiaId = button.getAttribute('data-id');
  const countSpan = button.querySelector('.like-count');

  // Carrega do localStorage
  let storedLikes = parseInt(localStorage.getItem(`likes-${noticiaId}`)) || 0;
  let liked = localStorage.getItem(`liked-${noticiaId}`) === 'true';

  // Mostra a contagem salva
  countSpan.textContent = storedLikes;
  button.style.opacity = liked ? 0.7 : 1;

  button.addEventListener('click', () => {
    if (!liked) {
      storedLikes++;
      liked = true;
    } else {
      storedLikes--;
      liked = false;
    }

    countSpan.textContent = storedLikes;
    button.style.opacity = liked ? 0.7 : 1;

    // Salva no localStorage
    localStorage.setItem(`likes-${noticiaId}`, storedLikes);
    localStorage.setItem(`liked-${noticiaId}`, liked);
  });
});
