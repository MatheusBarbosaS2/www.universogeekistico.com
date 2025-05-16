// ----------- FUNCIONALIDADE PARA NOTÍCIAS (Saiba mais) ---------------
if (window.location.pathname.includes("noticias.html")) {
  window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.noticia-content').forEach(conteudo => {
      const paragrafo = conteudo.querySelector('p');
      if (!paragrafo) return;

      let textoCompleto = paragrafo.getAttribute('data-completo') || paragrafo.textContent;
      if (!textoCompleto) return;

      let textoResumido = textoCompleto.length > 100 ? textoCompleto.substring(0, 100) + '...' : textoCompleto;

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

    // ----------- MOSTRAR SÓ A NOTÍCIA SE ?id=X ESTIVER NA URL ---------------
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (id) {
      document.querySelectorAll('.noticia').forEach(noticia => {
        if (noticia.getAttribute('data-id') !== id) {
          noticia.style.display = 'none';
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

    document.getElementById('pix-codigo').value = codigoPix;

    const qrImage = document.getElementById('pix-qrcode');
    if (qrImage) {
      qrImage.src = qrCodePix;
    }

    document.getElementById('pix-modal').style.display = 'flex';
  });
});

const copiarBotao = document.getElementById('copiar-btn');
if (copiarBotao) {
  copiarBotao.addEventListener('click', copiarPix);
}

function copiarPix() {
  const codigo = document.getElementById('pix-codigo');
  if (!codigo) return;

  codigo.select();
  codigo.setSelectionRange(0, 99999);

  try {
    document.execCommand('copy');
    alert('Código Pix copiado!');
  } catch (err) {
    alert('Erro ao copiar o código Pix.');
  }
}

const fecharBotao = document.getElementById('fechar-btn');
if (fecharBotao) {
  fecharBotao.addEventListener('click', fecharModal);
}

function fecharModal() {
  document.getElementById('pix-modal').style.display = 'none';
}

// ----------- BOTÃO COMPARTILHAR NOTÍCIA ---------------
document.querySelectorAll('.compartilhar-btn').forEach(botao => {
  botao.addEventListener('click', () => {
    const noticia = botao.closest('.noticia');
    if (!noticia) return;

    const id = noticia.getAttribute('data-id');
    if (!id) return;

    const urlBase = window.location.origin + window.location.pathname;
    const urlParaCompartilhar = `${urlBase}?id=${id}`;

    if (navigator.share) {
      navigator.share({
        title: document.title,
        text: "Confira esta notícia incrível no Universo Geekistico!",
        url: urlParaCompartilhar
      }).catch(err => console.error("Erro ao compartilhar", err));
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(urlParaCompartilhar).then(() => {
        alert("Link da notícia copiado para a área de transferência!");
      }).catch(err => {
        console.error("Erro ao copiar link", err);
        alert("Não foi possível copiar o link automaticamente. Copie manualmente: " + urlParaCompartilhar);
      });
    } else {
      prompt("Copie o link abaixo:", urlParaCompartilhar);
    }
  });
});

// ----------- CARROSSEL DE VÍDEOS ESTILO INSTAGRAM ---------------
const videos = document.querySelectorAll('.carousel-video');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
let currentIndex = 0;

function showVideo(index) {
  videos.forEach((video, i) => {
    video.classList.toggle('active', i === index);
    if (i !== index) video.pause();
  });
}

if (prevBtn && nextBtn && videos.length) {
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + videos.length) % videos.length;
    showVideo(currentIndex);
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % videos.length;
    showVideo(currentIndex);
  });

  showVideo(currentIndex);
}
