document.addEventListener('DOMContentLoaded', function () {
    // Use AJAX ou Fetch API para carregar dinamicamente as notícias no elemento #noticias-container.
    // Exemplo básico:
    fetch('noticias/noticia1.html')
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
    document.getElementById(noticiaId + '_visualizacoes').innerText = visualizacoes + ' visualizações';
}

function adicionarLinkNoticiaCompleta(noticiaId) {
    // Adicionar link para a notícia completa
    const linkElement = document.createElement('a');
    linkElement.href = 'noticias/' + noticiaId + '.html';
    linkElement.innerText = 'Ver notícia completa';
    document.getElementById(noticiaId + '_link').appendChild(linkElement);
}
