// script.js

// Função para carregar as postagens do localStorage
function loadPosts() {
    var postsDiv = document.getElementById("noticias");
    postsDiv.innerHTML = "";
    var posts = JSON.parse(localStorage.getItem("posts"));

    if (posts) {
        for (var i = 0; i < posts.length; i++) {
            var post = posts[i];
            var postDiv = document.createElement("div");
            postDiv.className = "noticia";
            var postContent = document.createElement("div");
            postContent.className = "noticia-content";

            var postTitle = document.createElement("h2");
            postTitle.textContent = post.title;

            var postImage = document.createElement("img");
            postImage.src = post.image;
            postImage.alt = "Imagem da Notícia";

            var postDesc1 = document.createElement("p");
            postDesc1.textContent = post.descricao1;

            var postDesc2 = document.createElement("p");
            postDesc2.textContent = post.descricao2;

            var deleteButton = document.createElement("button");
            deleteButton.textContent = "Excluir";
            deleteButton.onclick = function () {
                deletePost(posts.indexOf(post));
            };

            postContent.appendChild(postTitle);
            postContent.appendChild(postImage);
            postContent.appendChild(postDesc1);
            postContent.appendChild(postDesc2);
            postContent.appendChild(deleteButton);

            postDiv.appendChild(postContent);
            postsDiv.appendChild(postDiv);
        }
    }
}

// Função para adicionar uma postagem nova ao localStorage
function addPost(title, image, descricao1, descricao2) {
    var posts = JSON.parse(localStorage.getItem("posts"));

    if (!posts) {
        posts = [];
    }

    var post = {
        title: title,
        image: image,
        descricao1: descricao1,
        descricao2: descricao2
    };

    posts.unshift(post);
    localStorage.setItem("posts", JSON.stringify(posts));
    loadPosts();
}

// Função para excluir uma postagem do localStorage
function deletePost(index) {
    var posts = JSON.parse(localStorage.getItem("posts"));

    if (posts && index >= 0 && index < posts.length) {
        posts.splice(index, 1);
        localStorage.setItem("posts", JSON.stringify(posts));
        loadPosts();
    }
}

// Função para criar uma postagem nova a partir do formulário
function adicionarNoticia() {
    var imagemInput = document.getElementById("imagem");
    var tituloInput = document.getElementById("titulo");
    var descricao1Input = document.getElementById("descricao1");
    var descricao2Input = document.getElementById("descricao2");

    var imagem = imagemInput.files[0];
    var titulo = tituloInput.value;
    var descricao1 = descricao1Input.value;
    var descricao2 = descricao2Input.value;

    if (imagem && titulo && descricao1 && descricao2) {
        var reader = new FileReader();
        reader.onload = function (e) {
            addPost(titulo, e.target.result, descricao1, descricao2);
            window.location.href = "index.html";
        };
        reader.readAsDataURL(imagem);
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

// Carregar as postagens quando a página inicial for carregada
window.onload = loadPosts;
