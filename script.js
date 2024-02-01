// script.js
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

function loadPostsAdmin() {
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

            var editButton = document.createElement("button");
            editButton.textContent = "Editar";
            editButton.onclick = function() {
                editPost(i);
            };

            var deleteButton = document.createElement("button");
            deleteButton.textContent = "Excluir";
            deleteButton.onclick = function() {
                deletePost(i);
            };

            postDiv.appendChild(editButton);
            postDiv.appendChild(deleteButton);

            postsDiv.appendChild(postDiv);
        }
    }
}

function editPost(index) {
    // Implementar lógica de edição
    // Pode ser redirecionamento para uma página de edição ou utilização de modais
    // Exemplo: window.location.href = "editpost.html?index=" + index;
}

function deletePost(index) {
    var posts = JSON.parse(localStorage.getItem("posts"));
    posts.splice(index, 1);
    localStorage.setItem("posts", JSON.stringify(posts));
    loadPostsAdmin();
}

window.onload = loadPosts;

