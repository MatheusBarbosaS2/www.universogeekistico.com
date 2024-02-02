// script.js
function deletePost(index) {
    var posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.splice(index, 1);
    localStorage.setItem("posts", JSON.stringify(posts));
    loadPosts();
}

function loadPosts() {
    var postsDiv = document.getElementById("posts");
    postsDiv.innerHTML = "";
    var posts = JSON.parse(localStorage.getItem("posts")) || [];

    for (var i = 0; i < posts.length; i++) {
        var post = posts[i];

        var postDiv = document.createElement("div");
        var postTitle = document.createElement("h2");
        var postImage = document.createElement("img");
        var postText = document.createElement("p");
        var deleteButton = document.createElement("button");

        postDiv.className = "post";
        postTitle.className = "post-title";
        postImage.className = "post-image";
        postText.className = "post-text";

        postTitle.textContent = post.title;
        postImage.src = post.image;
        postText.textContent = post.text;

        deleteButton.textContent = "Excluir";
        deleteButton.onclick = (function (index) {
            return function () {
                deletePost(index);
            };
        })(i);

        postDiv.appendChild(postTitle);
        postDiv.appendChild(postImage);
        postDiv.appendChild(postText);
        postDiv.appendChild(deleteButton);

        postsDiv.appendChild(postDiv);
    }
}

function addPost(title, image, text) {
    var posts = JSON.parse(localStorage.getItem("posts")) || [];
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
    var text = textInput.value;

    var fileInput = document.getElementById("image");
    var image = fileInput.files[0];

    if (title && image && text) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var imageBase64 = e.target.result;
            addPost(title, imageBase64, text);
            loadPosts();
            // Redirecionar para a página inicial
            window.location.href = "index.html";
        };
        reader.readAsDataURL(image);
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

// Carregar as postagens quando a página inicial for carregada
window.onload = loadPosts;
