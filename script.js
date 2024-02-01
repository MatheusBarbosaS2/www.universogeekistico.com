// script.js
// ... (código existente) ...

// Modificando a função loadPosts para incluir o botão de exclusão
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
            var deleteButton = document.createElement("button"); // Novo botão de exclusão

            postDiv.className = "post";
            postTitle.className = "post-title";
            postImage.className = "post-image";
            postText.className = "post-text";

            postTitle.textContent = post.title;
            postImage.src = post.image;
            postText.textContent = post.text;

            // Configurar o botão de exclusão
            deleteButton.textContent = "Excluir";
            deleteButton.onclick = (function (index) {
                return function () {
                    deletePost(index);
                }
            })(i);

            postDiv.appendChild(postTitle);
            postDiv.appendChild(postImage);
            postDiv.appendChild(postText);
            postDiv.appendChild(deleteButton); // Adicionar o botão de exclusão

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

// ... (restante do código existente) ...
