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

      midias.forEach((m, i) => {
        const video = m.querySelector('video');
        if (video) {
          if (i === proximoIndex) video.play();
          else video.pause();
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

      midias.forEach((m, i) => {
        const video = m.querySelector('video');
        if (video) {
          if (i === anteriorIndex) video.play();
          else video.pause();
        }
      });
    });
  });
});

// ----------- CONTROLES DE VÍDEO ---------------
document.querySelectorAll('.midia').forEach(midia => {
  const video = midia.querySelector('video');
  const playPauseBtn = midia.querySelector('.play-pause');
  const retrocederBtn = midia.querySelector('.retroceder');
  const avancarBtn = midia.querySelector('.avancar');
  const volumeSlider = midia.querySelector('.controle-volume');
  const volumeTexto = midia.querySelector('.volume-texto');

  // Play/Pause
  if (playPauseBtn) {
    playPauseBtn.textContent = video.paused ? '▷ play' : '|| pausar';

    playPauseBtn.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        playPauseBtn.textContent = '|| pausar';
      } else {
        video.pause();
        playPauseBtn.textContent = '▷ play';
      }
    });

    video.addEventListener('play', () => playPauseBtn.textContent = '|| pausar');
    video.addEventListener('pause', () => playPauseBtn.textContent = '▷ play');
  }

  // Retroceder e Avançar
  retrocederBtn?.addEventListener('click', () => {
    video.currentTime = Math.max(0, video.currentTime - 10);
  });

  avancarBtn?.addEventListener('click', () => {
    video.currentTime = Math.min(video.duration, video.currentTime + 10);
  });

  // Controle de Volume
  if (volumeSlider && volumeTexto) {
    // Set volume inicial do video
    video.volume = volumeSlider.value;

    // Atualiza texto
    const atualizaTextoVolume = (val) => {
      const pct = Math.round(val * 100);
      volumeTexto.textContent = `🔊${pct}%`;
    };

    atualizaTextoVolume(volumeSlider.value);

    // Quando o usuário muda o slider
    volumeSlider.addEventListener('input', () => {
      video.volume = volumeSlider.value;
      atualizaTextoVolume(volumeSlider.value);
    });

    // Se o volume for alterado pelo vídeo por qualquer razão (ex: mutar via código)
    video.addEventListener('volumechange', () => {
      volumeSlider.value = video.volume;
      atualizaTextoVolume(video.volume);
    });
  }
});
