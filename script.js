// script.js
function loadNoticias() {
    var noticiasDiv = document.getElementById("noticias");
    noticiasDiv.innerHTML = "";
    var noticias = JSON.parse(localStorage.getItem("noticias"));
    
    if (noticias) {
        for (var i = 0; i < noticias.length; i++) {
            var noticia = noticias[i];
            var noticiaDiv = document.createElement("div");
            var noticiaTitle = document.createElement("h2");
            var noticiaImage = document.createElement("img");
            var noticiaText = document.createElement("p");

            noticiaDiv.className = "noticia";
            noticiaTitle.className = "noticia-title";
            noticiaImage.className = "noticia-image";
            noticiaText.className = "noticia-text";

            noticiaTitle.textContent = noticia.title;
            noticiaImage.src = noticia.image;
            noticiaText.textContent = noticia.text;

            noticiaDiv.appendChild(noticiaTitle);
            noticiaDiv.appendChild(noticiaImage);
            noticiaDiv.appendChild(noticiaText);

            // Adicionar botão para excluir a notícia
            var deleteButton = document.createElement("button");
            deleteButton.textContent = "Excluir";
            deleteButton.onclick = function () {
                excluirNoticia(i);
            };

            noticiaDiv.appendChild(deleteButton);

            noticiasDiv.appendChild(noticiaDiv);
        }
    }
}

function adicionarNoticia(title, image, text) {
    var noticias = JSON.parse(localStorage.getItem("noticias"));
    
    if (!noticias) {
        noticias = [];
    }

    var noticia = {
        title: title,
        image: image,
        text: text
    };

    noticias.unshift(noticia);
    localStorage.setItem("noticias", JSON.stringify(noticias));
}

function excluirNoticia(index) {
    var noticias = JSON.parse(localStorage.getItem("noticias"));

    if (noticias && noticias.length > index) {
        noticias.splice(index, 1);
        localStorage.setItem("noticias", JSON.stringify(noticias));
        loadNoticias(); // Recarregar as notícias após excluir
    }
}

window.onload = loadNoticias;

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
