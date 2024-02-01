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
            var deleteButton = document.createElement("button");

            postDiv.className = "post";
            postTitle.className = "post-title";
            postImage.className = "post-image";
            postText.className = "post-text";
            deleteButton.className = "delete-button";

            postTitle.textContent = post.title;
            if (post.image) {
                postImage.src = post.image;
                postDiv.appendChild(postImage);
            }
            postText.textContent = post.text;

            deleteButton.textContent = "Excluir";

            postDiv.appendChild(postTitle);
            postDiv.appendChild(postText);
            postDiv.appendChild(deleteButton);

            postsDiv.appendChild(postDiv);
        }

        var deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(function (button, index) {
            button.addEventListener('click', function () {
                deletePost(index);
            });
        });
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

function deletePost(index) {
    var posts = JSON.parse(localStorage.getItem("posts"));
    posts.splice(index, 1);
    localStorage.setItem("posts", JSON.stringify(posts));
    loadPosts();
}

window.onload = loadPosts;
