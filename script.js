// script.js

// Função para carregar as notícias do localStorage
function loadNoticias() {
    var noticiasDiv = document.getElementById("noticias");
    noticiasDiv.innerHTML = "";
    var noticias = JSON.parse(localStorage.getItem("noticias"));

    if (noticias) {
        for (var i = 0; i < noticias.length; i++) {
            var noticia = noticias[i];
            var noticiaDiv = document.createElement("div");
            noticiaDiv.className = "noticia";

            var noticiaContent = document.createElement("div");
            noticiaContent.className = "noticia-content";

            var noticiaTitle = document.createElement("h2");
            var noticiaImage = document.createElement("img");
            var noticiaText = document.createElement("p");

            noticiaTitle.textContent = noticia.titulo;
            noticiaImage.src = noticia.imagem;
            noticiaText.textContent = noticia.descricao1;

            noticiaContent.appendChild(noticiaTitle);
            noticiaContent.appendChild(noticiaImage);
            noticiaContent.appendChild(noticiaText);

            noticiaDiv.appendChild(noticiaContent);

            noticiasDiv.appendChild(noticiaDiv);
        }
    }
}

// Função para adicionar uma notícia nova ao localStorage
function addNoticia(titulo, imagem, descricao1, descricao2) {
    var noticias = JSON.parse(localStorage.getItem("noticias"));

    if (!noticias) {
        noticias = [];
    }

    var noticia = {
        titulo: titulo,
        imagem: imagem,
        descricao1: descricao1,
        descricao2: descricao2
    };

    noticias.unshift(noticia);
    localStorage.setItem("noticias", JSON.stringify(noticias));
}

function redirectToAddPost() {
    window.location.href = "post.html";
}

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
            addNoticia(titulo, e.target.result, descricao1, descricao2);
            window.location.href = "index.html";
        };
        reader.readAsDataURL(imagem);
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

// Carregar as notícias quando a página inicial for carregada
window.onload = loadNoticias;
