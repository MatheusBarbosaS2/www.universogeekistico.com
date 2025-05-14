// Função: Alterna entre texto resumido e completo
document.querySelectorAll('.noticia-content').forEach(conteudo => {
  const paragrafo = conteudo.querySelector('p');
  const textoCompleto = paragrafo.getAttribute('data-completo') || paragrafo.textContent;

  // Armazena o texto completo no atributo se ainda não existir
  if (!paragrafo.getAttribute('data-completo')) {
    paragrafo.setAttribute('data-completo', textoCompleto);
  }

  // Limita o texto a 100 caracteres e adiciona reticências
  let textoResumido = textoCompleto;
  if (textoCompleto.length > 100) {
    textoResumido = textoCompleto.substring(0, 100) + '...';
  }

  // Define o texto inicial como resumido
  paragrafo.textContent = textoResumido;

  // Cria e adiciona o botão "Saiba mais"
  const botaoSaibaMais = document.createElement('button');
  botaoSaibaMais.textContent = 'Saiba mais';
  botaoSaibaMais.classList.add('saiba-mais');
  conteudo.appendChild(botaoSaibaMais);

  // Alterna entre mostrar mais ou menos
  botaoSaibaMais.addEventListener('click', () => {
    if (paragrafo.textContent === textoResumido) {
      paragrafo.textContent = textoCompleto;
      botaoSaibaMais.textContent = 'Mostrar menos';
    } else {
      paragrafo.textContent = textoResumido;
      botaoSaibaMais.textContent = 'Saiba mais';
    }
  });
});

// Função: Abrir o modal Pix com o código do botão clicado
document.querySelectorAll('.comprar').forEach(botao => {
  botao.addEventListener('click', () => {
    const codigoPix = botao.getAttribute('data-pix');
    document.getElementById('pix-codigo').value = codigoPix;
    document.getElementById('pix-modal').style.display = 'flex';
  });
});

// Função: Copiar o código Pix para a área de transferência
function copiarPix() {
  const codigo = document.getElementById('pix-codigo');
  codigo.select();
  codigo.setSelectionRange(0, 99999); // Compatível com mobile
  document.execCommand('copy');
  alert('Código Pix copiado!');
}

// Função: Fechar o modal Pix
function fecharPix() {
  document.getElementById('pix-modal').style.display = 'none';
}
