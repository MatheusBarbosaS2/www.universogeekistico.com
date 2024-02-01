// script.js

// Função para carregar as notícias do localStorage
function loadNoticias() {
    var noticiasDiv = document.getElementById("noticias");
    noticiasDiv.innerHTML = "";
    var noticias = JSON.parse(localStorage.getItem("noticias"));

    for (var i = 0; i < posts.length; i++) {
        // ... (código anterior)

        // Adicionar os elementos à div da postagem
        postDiv.appendChild(postTitle);
        postDiv.appendChild(postImage);
        postDiv.appendChild(postText);

        if (conteudo.innerHTML === textoCompleto) {
            // Se o conteúdo está completo, exibe menos
            conteudo.innerHTML = "Há alguns meses, Kevin Feige, diretor criativo da Marvel Studios, revelou que o roteiro preliminar de ‘Homem-Aranha 4‘ já está pronto...";
            botao.innerHTML = "Saiba Mais";
        } else {
            // Se não, exibe mais
            conteudo.innerHTML = textoCompleto;
            botao.innerHTML = "Mostrar Menos";
        }

        // Adicionar a div da postagem à div principal
        postsDiv.appendChild(postDiv);
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

function redirectToAddPost() {
    window.location.href = "post.html";
}