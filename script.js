document.addEventListener("DOMContentLoaded", function () {
    const newsContainer = document.getElementById("news-container");

    // Função para truncar texto
    function truncateText(text, maxLength) {
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    }

    // Função para obter dinamicamente o conteúdo da notícia
    async function fetchNewsData(newsUrl) {
        try {
            const response = await fetch(newsUrl);
            const newsHtml = await response.text();
            const parser = new DOMParser();
            const newsDoc = parser.parseFromString(newsHtml, "text/html");

            // Extrai informações do documento da notícia
            const title = newsDoc.querySelector("h2").textContent;
            const descriptionElement = newsDoc.querySelector("p");
            const description = truncateText(descriptionElement.textContent, 150); // Limite para 150 caracteres
            const thumbnail = newsDoc.querySelector("img").getAttribute("src");
            const fullDescriptionUrl = newsUrl;  // Mantém a URL da notícia original
            const views = parseInt(newsDoc.querySelector("p:last-of-type").textContent.match(/\d+/)[0]);

            // Adiciona a notícia ao container
            newsContainer.innerHTML += `
                <div class="news-area" onclick="window.location.href='${fullDescriptionUrl}'">
                    <h2>${title}</h2>
                    <p>${description}</p>
                    <img src="${thumbnail}" alt="Thumbnail">
                    <p>Número de visualizações: ${views}</p>
                </div>
            `;
        } catch (error) {
            console.error("Erro ao obter notícia:", error);
        }
    }

    // Chama a função para a notícia1.html
    fetchNewsData("noticia1.html");

    // Adicione mais notícias chamando a função para outros arquivos, por exemplo:
    fetchNewsData("noticia2.html");
    // fetchNewsData("noticia3.html");
    // ...

});
