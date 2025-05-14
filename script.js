document.querySelectorAll('.noticia-content').forEach(conteudo => {
  const paragrafo = conteudo.querySelector('p');
  const textoCompleto = paragrafo.getAttribute('data-completo');
  
  // Limita o texto a 100 caracteres e adiciona os três pontinhos
  let textoResumido = textoCompleto;
  if (textoCompleto.length > 100) {
    textoResumido = textoCompleto.substring(0, 100) + '...';
  }

  // Inicializa com o texto resumido
  paragrafo.textContent = textoResumido;

  // Ação do botão "Saiba mais"
  conteudo.querySelector('.saiba-mais').addEventListener('click', () => {
    if (paragrafo.textContent === textoResumido) {
      paragrafo.textContent = textoCompleto; // Exibe o texto completo
      conteudo.querySelector('.saiba-mais').textContent = 'Mostrar menos';
    } else {
      paragrafo.textContent = textoResumido; // Exibe o texto resumido
      conteudo.querySelector('.saiba-mais').textContent = 'Saiba mais';
    }
  });
});

// Inicializa com o pix
document.querySelectorAll('.comprar').forEach(botao => {
  botao.addEventListener('click', () => {
    const codigoPix = botao.getAttribute('data-pix');
    document.getElementById('pix-codigo').value = codigoPix;
    document.getElementById('pix-modal').style.display = 'flex';
  });
});

function copiarPix() {
  const textarea = document.getElementById('pix-codigo');
  textarea.select();
  document.execCommand('copy');
  alert('Código Pix copiado!');
}

function fecharPix() {
  document.getElementById('pix-modal').style.display = 'none';
}
