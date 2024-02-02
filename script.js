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

// Função para carregar as postagens no modo administrativo
function loadAdminPosts() {
    var adminPostsDiv = document.getElementById("admin-posts");
    adminPostsDiv.innerHTML = "";

    var posts = JSON.parse(localStorage.getItem("posts"));
    if (posts) {
        for (var i = 0; i < posts.length; i++) {
            var post = posts[i];
            var postDiv = document.createElement("div");
            var postTitle = document.createElement("h2");
            var postImage = document.createElement("img");
            var postText = document.createElement("p");
            var editButton = document.createElement("button");
            var deleteButton = document.createElement("button");

            postDiv.className = "post";
            postTitle.className = "post-title";
            postImage.className = "post-image";
            postText.className = "post-text";
            editButton.textContent = "Editar";
            deleteButton.textContent = "Excluir";

            postTitle.textContent = post.title;
            postImage.src = post.image;
            postText.textContent = post.text;

            editButton.onclick = (function(index) {
                return function() {
                    editPost(index);
                };
            })(i);

            deleteButton.onclick = (function(index) {
                return function() {
                    deletePost(index);
                };
            })(i);

            postDiv.appendChild(postTitle);
            postDiv.appendChild(postImage);
            postDiv.appendChild(postText);
            postDiv.appendChild(editButton);
            postDiv.appendChild(deleteButton);

            adminPostsDiv.appendChild(postDiv);
        }
    }
}

// Função para excluir uma postagem
function deletePost(index) {
    var posts = JSON.parse(localStorage.getItem("posts"));
    posts.splice(index, 1);
    localStorage.setItem("posts", JSON.stringify(posts));
    loadAdminPosts();
}

// Função para editar uma postagem (lógica básica, pode ser aprimorada)
function editPost(index) {
    var posts = JSON.parse(localStorage.getItem("posts"));
    var updatedTitle = prompt("Digite o novo título:", posts[index].title);
    var updatedText = prompt("Digite o novo texto:", posts[index].text);

    if (updatedTitle !== null && updatedText !== null) {
        posts[index].title = updatedTitle;
        posts[index].text = updatedText;
        localStorage.setItem("posts", JSON.stringify(posts));
        loadAdminPosts();
    }
}

// Função para adicionar uma postagem nova ao localStorage
function addPost(title, image, text) {
    var posts = JSON.parse(localStorage.getItem("posts")) || [];
    var post = { title: title, image: image, text: text };
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

// Carregar as postagens quando a página inicial for carregada
window.onload = function() {
    var currentPage = window.location.href.split("/").pop();
    if (currentPage === "index.html") {
        loadPosts();
    } else if (currentPage === "adm.html") {
        loadAdminPosts();
    }
};
