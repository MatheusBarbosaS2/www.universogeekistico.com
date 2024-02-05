// script.js

document.addEventListener("DOMContentLoaded", function () {
    const newsContainer = document.getElementById("news-container");

    // Exemplo de notícia
    const news = {
        title: "Título da Notícia 1",
        description: "Descrição curta da Notícia 1...",
        thumbnail: "caminho/para/imagem-menor.jpg",
        fullDescription: "<p>Descrição completa da Notícia 1...</p><img src='caminho/para/imagem-maior.jpg' alt='Thumbnail Maior'><p>Número de visualizações: 1000</p>",
        author: "Matheus Barbosa",
        views: 1000
    };

    // Adiciona a notícia ao container
    newsContainer.innerHTML += `
        <div class="news-area" onclick="showFullDescription('${news.fullDescription}')">
            <h2>${news.title}</h2>
            <p>${news.description}</p>
            <img src="${news.thumbnail}" alt="Thumbnail">
            <p>Número de visualizações: ${news.views}</p>
        </div>
    `;
});

function showFullDescription(fullDescription) {
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = fullDescription;

    document.body.appendChild(modal);

    modal.addEventListener("click", function () {
        modal.remove();
    });
}
