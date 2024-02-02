function toggleForm() {
    var form = document.getElementById("postForm");
    form.style.display = form.style.display === "none" ? "block" : "none";
}

function deletePost(index) {
    var posts = JSON.parse(localStorage.getItem("posts"));
    posts.splice(index, 1);
    localStorage.setItem("posts", JSON.stringify(posts));
    loadPosts();
}

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
    var image = URL.createObjectURL(imageInput.files[0]);
    var text = textInput.value;

    if (title && image && text) {
        addPost(title, image, text);
        loadPosts();
        toggleForm();
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

window.onload = loadPosts;