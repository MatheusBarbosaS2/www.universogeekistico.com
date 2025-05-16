// ----------- FUNCIONALIDADE PARA NOTÍCIAS (Saiba mais) ---------------
if (window.location.pathname.includes("noticias.html")) {
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.noticia-content').forEach(conteudo => {
      const paragrafo = conteudo.querySelector('p');
      if (!paragrafo) return;

      const textoCompleto = paragrafo.getAttribute('data-completo') || paragrafo.textContent;
      if (!textoCompleto) return;

      const textoResumido = textoCompleto.length > 100 ? textoCompleto.substring(0, 100) + '...' : textoCompleto;
      paragrafo.textContent = textoResumido;

      const botao = conteudo.querySelector('.saiba-mais');
      if (botao) {
        botao.addEventListener('click', () => {
          const mostrarMais = botao.textContent === 'Saiba mais';
          paragrafo.textContent = mostrarMais ? textoCompleto : textoResumido;
          botao.textContent = mostrarMais ? 'Mostrar menos' : 'Saiba mais';
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
  copiarBotao.addEventListener('click', () => {
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
  });
}

const fecharBotao = document.getElementById('fechar-btn');
if (fecharBotao) {
  fecharBotao.addEventListener('click', () => {
    document.getElementById('pix-modal').style.display = 'none';
  });
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

// ----------- CARROSSEL DE VÍDEOS (estilo Instagram com botões anterior/próximo) ---------------
document.addEventListener("DOMContentLoaded", () => {
  const botoesProximo = document.querySelectorAll(".proximo");
  const botoesAnterior = document.querySelectorAll(".anterior");

  botoesProximo.forEach(botao => {
    botao.addEventListener("click", () => {
      const carrossel = botao.closest(".carrossel");
      const midias = carrossel.querySelectorAll(".midia");
      const ativo = carrossel.querySelector(".midia.ativa");
      const indexAtual = Array.from(midias).indexOf(ativo);

      ativo.classList.remove("ativa");
      const proximoIndex = (indexAtual + 1) % midias.length;
      midias[proximoIndex].classList.add("ativa");

      // Pausa o vídeo anterior e toca o novo se for <video>
      midias.forEach((m, i) => {
        if (m.tagName === 'VIDEO') {
          if (i === proximoIndex) m.play();
          else m.pause();
        }
      });
    });
  });

  botoesAnterior.forEach(botao => {
    botao.addEventListener("click", () => {
      const carrossel = botao.closest(".carrossel");
      const midias = carrossel.querySelectorAll(".midia");
      const ativo = carrossel.querySelector(".midia.ativa");
      const indexAtual = Array.from(midias).indexOf(ativo);

      ativo.classList.remove("ativa");
      const anteriorIndex = (indexAtual - 1 + midias.length) % midias.length;
      midias[anteriorIndex].classList.add("ativa");

      // Pausa o vídeo anterior e toca o novo se for <video>
      midias.forEach((m, i) => {
        if (m.tagName === 'VIDEO') {
          if (i === anteriorIndex) m.play();
          else m.pause();
        }
      });
    });
  });
});
