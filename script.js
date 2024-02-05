// script.js
document.addEventListener("DOMContentLoaded", function () {
    const newsContainer = document.getElementById("news-container");

    // Exemplo de notícia
    const news = {
        title: "MARVEL IRÁ TRAZER OS ‘ETERNOS’ NOVAMENTE AO MCU!",
        description: "Os Eternos chegaram como uma grande promessa para a Fase 4 do MCU. Infelizmente, a equipe de seres poderosos não virou unan...",
        thumbnail: "imagem/eternosdenovo.jpeg",
        fullDescriptionUrl: "noticia1.html",
        author: "Matheus Barbosa",
        views:
    };

    // Adiciona a notícia ao container
    newsContainer.innerHTML += `
        <div class="news-area" onclick="window.location.href='${news.fullDescriptionUrl}'">
            <h2>${news.title}</h2>
            <p>${news.description}</p>
            <img src="${news.thumbnail}" alt="Thumbnail">
            <p>Número de visualizações: ${news.views}</p>
        </div>
    `;
});
