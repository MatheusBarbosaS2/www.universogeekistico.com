// script.js

// Função para carregar as postagens do localStorage
function loadPosts(isAdmin) {
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
            if (post.image) {
                postImage.src = post.image;
                postDiv.appendChild(postImage);
            }
            postText.textContent = post.text;
            
            // Adicionar o botão de exclusão apenas se for a página de administração
            if (isAdmin) {
                var deleteButton = document.createElement("button");
                deleteButton.className = "delete-button";
                deleteButton.textContent = "Excluir";
                deleteButton.addEventListener('click', function () {
                    deletePost(i, isAdmin);
                });
                postDiv.appendChild(deleteButton);
            }

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

function deletePost(index, isAdmin) {
    var posts = JSON.parse(localStorage.getItem("posts"));
    posts.splice(index, 1);
    localStorage.setItem("posts", JSON.stringify(posts));
    
    // Recarregar as postagens após excluir
    loadPosts(isAdmin);
}
