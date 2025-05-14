document.querySelectorAll('.saiba-mais').forEach(botao => {
  botao.addEventListener('click', () => {
    const paragrafo = botao.previousElementSibling;
    if (botao.textContent === 'Saiba mais') {
      paragrafo.style.maxHeight = 'none';
      botao.textContent = 'Mostrar menos';
    } else {
      paragrafo.style.maxHeight = '4.5em'; // Aproximadamente 3 linhas
      botao.textContent = 'Saiba mais';
    }
  });
});
