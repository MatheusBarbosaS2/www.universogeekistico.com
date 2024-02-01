// script.js
// Função para carregar as notícias do localStorage
function loadNoticias() {
    // Pegar o elemento div que vai conter as notícias
    var noticiasDiv = document.getElementById("noticias");
    // Limpar o conteúdo da div
    noticiasDiv.innerHTML = "";
    // Pegar o array de notícias do localStorage
    var noticias = JSON.parse(localStorage.getItem("noticias"));
    // Se o array não for nulo, iterar sobre ele
    if (noticias) {
        for (var i = 0; i < noticias.length; i++) {
            // Pegar a notícia atual
            var noticia = noticias[i];
            // Criar os elementos html para a notícia
            var noticiaDiv = document.createElement("div");
            var noticiaTitle = document.createElement("h2");
            var noticiaImage = document.createElement("img");
            var noticiaText = document.createElement("p");
            // Atribuir as classes css aos elementos
            noticiaDiv.className = "noticia";
            noticiaTitle.className = "noticia-title";
            noticiaImage.className = "noticia-image";
            noticiaText.className = "noticia-text";
            // Atribuir os valores da notícia aos elementos
            noticiaTitle.textContent = noticia.title;
            noticiaImage.src = noticia.image;
            noticiaText.textContent = noticia.text;
            // Adicionar os elementos à div da notícia
            noticiaDiv.appendChild(noticiaTitle);
            noticiaDiv.appendChild(noticiaImage);
            noticiaDiv.appendChild(noticiaText);
            // Adicionar a div da notícia à div principal
            noticiasDiv.appendChild(noticiaDiv);
        }
    }
}

// Função para adicionar uma notícia nova ao localStorage
function adicionarNoticia(title, image, text) {
    // Pegar o array de notícias do localStorage
    var noticias = JSON.parse(localStorage.getItem("noticias"));
    // Se o array for nulo, criar um novo
    if (!noticias) {
        noticias = [];
    }
    // Criar um objeto para a notícia nova
    var noticia = {
        title: title,
        image: image,
        text: text
    };
    // Adicionar a notícia nova ao início do array
    noticias.unshift(noticia);
    // Salvar o array no localStorage
    localStorage.setItem("noticias", JSON.stringify(noticias));
}

// Restante do código do script.js permanece inalterado

// Carregar as notícias quando a página inicial for carregada
window.onload = loadNoticias;

// Função para criar uma notícia nova a partir do formulário
function adicionarNoticia() {
    var tituloInput = document.getElementById("titulo");
    var imagemInput = document.getElementById("imagem");
    var descricao1Input = document.getElementById("descricao1");
    var descricao2Input = document.getElementById("descricao2");

    var titulo = tituloInput.value;
    var imagem = imagemInput.files[0];
    var descricao1 = descricao1Input.value;
    var descricao2 = descricao2Input.value;

    if (titulo && imagem && descricao1 && descricao2) {
        var reader = new FileReader();
        reader.onload = function (e) {
            adicionarNoticia(titulo, e.target.result, descricao1, descricao2);
            window.location.href = "index.html";
        };
        reader.readAsDataURL(imagem);
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}
