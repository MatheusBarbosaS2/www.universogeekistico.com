// script.js

document.addEventListener("DOMContentLoaded", function () {
    const newsContainer = document.getElementById("news-container");

    // Simulação de uma solicitação HTTP para carregar o arquivo JSON
    fetch('noticias.json')
        .then(response => response.json())
        .then(data => {
            // Itera sobre as notícias no JSON e adiciona ao container
            data.forEach(news => {
                newsContainer.innerHTML += `
                    <div class="news-area" onclick="window.location.href='${news.fullDescriptionUrl}'">
                        <h2>${news.title}</h2>
                        <p>${news.description}</p>
                        <img src="${news.thumbnail}" alt="Thumbnail">
                        <p>Número de visualizações: ${news.views}</p>
                    </div>
                `;
            });
        })
        .catch(error => console.error('Erro ao carregar notícias:', error));
});
