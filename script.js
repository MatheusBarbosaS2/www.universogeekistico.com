document.addEventListener('DOMContentLoaded', function () {
    // Use AJAX ou Fetch API para carregar dinamicamente as notícias no elemento #noticias-container.
    // Exemplo básico:
    fetch('noticia1.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('noticias-container').innerHTML = data;

            // Incrementar o número de visualizações
            incrementarVisualizacoes('noticia1');

            // Adicionar link para a notícia completa
            adicionarLinkNoticiaCompleta('noticia1');
        });
});

function incrementarVisualizacoes(noticiaId) {
    // Implemente a lógica para incrementar o número de visualizações
    // Pode ser feito usando cookies, armazenamento local, servidor backend, etc.
    // Exemplo usando armazenamento local:
    let visualizacoes = localStorage.getItem(noticiaId + '_visualizacoes') || 0;
    visualizacoes++;
    localStorage.setItem(noticiaId + '_visualizacoes', visualizacoes);

    // Atualizar a exibição na notícia
    const visualizacoesElement = document.getElementById(noticiaId + '_visualizacoes');
    if (visualizacoesElement) {
        visualizacoesElement.innerText = visualizacoes + ' visualizações';
    }
}

function adicionarLinkNoticiaCompleta(noticiaId) {
    // Adicionar link para a notícia completa
    const linkElement = document.getElementById(noticiaId + '_link');
    if (linkElement) {
        const link = document.createElement('a');
        link.href = 'noticia1.html';
        link.innerText = 'Ver notícia completa';
        linkElement.appendChild(link);
    }
}
