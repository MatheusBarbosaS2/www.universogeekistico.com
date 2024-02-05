// script.js
document.addEventListener("DOMContentLoaded", function () {
    // Exemplo de notícia
    const news = {
        title: "Título da Notícia 1",
        description: "Descrição completa da Notícia 1...",
        thumbnail: "caminho/para/imagem_grande.jpg",
        fullDescriptionUrl: "noticia1.html",
        views: 1000
    };

    // Seleciona a div da notícia
    const newsContainer = document.getElementById("noticia1");

    // Adiciona o conteúdo da notícia à div
    newsContainer.innerHTML = `
        <h2>${news.title}</h2>
        <p>${news.description}</p>
        <img src="${news.thumbnail}" alt="Thumbnail">
        <p>Número de visualizações: ${news.views}</p>
        <a class="noticia_link" href="${news.fullDescriptionUrl}"></a>
    `;

    // Adiciona evento de clique para redirecionar ao link
    newsContainer.addEventListener("click", function () {
        window.location.href = news.fullDescriptionUrl;
    });
});
