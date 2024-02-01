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
            postTitle.className = "noticia-titulo";
            postImage.className = "noticia-imagem";
            postText.className = "noticia-conteudo";

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

    loadPosts(); // Recarregar as postagens na página inicial
}

// Função para criar uma postagem nova a partir do formulário
function adicionarNoticia() {
    var titleInput = document.getElementById("titulo");
    var imageInput = document.getElementById("imagem");
    var textInput = document.getElementById("descricao2");

    var title = titleInput.value;
    var image = imageInput.value;
    var text = textInput.value;

    if (title && image && text) {
        addPost(title, image, text);
        window.location.href = "index.html";
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

// Função para carregar as postagens na página de administração
function loadAdminPosts() {
    var admPostsDiv = document.getElementById("adm-posts");
    admPostsDiv.innerHTML = "";

    var posts = JSON.parse(localStorage.getItem("posts"));

    if (posts) {
        for (var i = 0; i < posts.length; i++) {
            var post = posts[i];

            var postDiv = document.createElement("div");
            var postTitle = document.createElement("h2");
            var postImage = document.createElement("img");
            var postDeleteButton = document.createElement("button");

            postDiv.className = "post";
            postTitle.className = "post-title";
            postImage.className = "post-image";
            postDeleteButton.className = "delete-button";

            postTitle.textContent = post.title;
            postImage.src = post.image;
            postDeleteButton.textContent = "Excluir";
            postDeleteButton.onclick = function() { deletePost(i); };

            postDiv.appendChild(postTitle);
            postDiv.appendChild(postImage);
            postDiv.appendChild(postDeleteButton);

            admPostsDiv.appendChild(postDiv);
        }
    }
}

// Função para excluir uma postagem
function deletePost(index) {
    var posts = JSON.parse(localStorage.getItem("posts"));

    if (index >= 0 && index < posts.length) {
        posts.splice(index, 1);
        localStorage.setItem("posts", JSON.stringify(posts));
        loadAdminPosts(); // Recarregar a lista após a exclusão
    }
}

// Carregar as postagens quando a página inicial for carregada
window.onload = function() {
    loadPosts();
    // Carregar as postagens na página de administração ao carregar a página
    loadAdminPosts();
};
