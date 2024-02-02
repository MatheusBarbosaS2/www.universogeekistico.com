// script.js

// Função para carregar as postagens do localStorage
function loadPosts() {
    var postsDiv = document.getElementById("posts");
    postsDiv.innerHTML = "";
    var posts = JSON.parse(localStorage.getItem("posts"));

    if (posts) {
        for (var i = 0; i < posts.length; i++) {
            var post = posts[i];
            var postDiv = document.createElement("div");
            var postTitle = document.createElement("h2");
            var postImage = document.createElement("img");
            var postText = document.createElement("p");

            postDiv.className = "post";
            postTitle.className = "post-title";
            postImage.className = "post-image";
            postText.className = "post-text";

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
function createPost() {
    var titleInput = document.getElementById("title");
    var imageInput = document.getElementById("image");
    var textInput = document.getElementById("text");

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

// Função para editar uma postagem existente
function editPost(index) {
    var posts = JSON.parse(localStorage.getItem("posts"));
    var post = posts[index];
    var updatedTitle = prompt("Novo título:", post.title);
    var updatedText = prompt("Novo texto:", post.text);

    if (updatedTitle !== null && updatedText !== null) {
        post.title = updatedTitle;
        post.text = updatedText;
        localStorage.setItem("posts", JSON.stringify(posts));
        loadPosts();
    }
}

// Função para excluir uma postagem existente
function deletePost(index) {
    var confirmDelete = confirm("Tem certeza que deseja excluir esta postagem?");

    if (confirmDelete) {
        var posts = JSON.parse(localStorage.getItem("posts"));
        posts.splice(index, 1);
        localStorage.setItem("posts", JSON.stringify(posts));
        loadPosts();
    }
}

// Carregar as postagens quando a página inicial for carregada
window.onload = loadPosts;
