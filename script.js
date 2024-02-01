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
            var postTitle = document.createElement("h2");
            var postImage = document.createElement("img");
            var postText = document.createElement("p");

            postDiv.className = "noticia";
            postTitle.className = "noticia-title";
            postImage.className = "noticia-image";
            postText.className = "noticia-text";

            postTitle.textContent = post.title;
            postImage.src = post.image;
            postText.textContent = post.text;

            postDiv.appendChild(postTitle);
            postDiv.appendChild(postImage);
            postDiv.appendChild(postText);

            postsDiv.appendChild(postDiv);
        }
    }
}

// Função para adicionar uma postagem nova ao localStorage
function addPost(title, image, text) {
    var posts = JSON.parse(localStorage.getItem("posts"));

    if (!posts) {
        posts = [];
    }

    var post = {
        title: title,
        image: image,
        text: text
    };

    posts.unshift(post);
    localStorage.setItem("posts", JSON.stringify(posts));
}

// Função para criar uma postagem nova a partir do formulário
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
            addPost(titulo, e.target.result, descricao1 + " " + descricao2);
            window.location.href = "index.html";
        };
        reader.readAsDataURL(imagem);
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

// Carregar as postagens quando a página inicial for carregada
window.onload = loadPosts;
