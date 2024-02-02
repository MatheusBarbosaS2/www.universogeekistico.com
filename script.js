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
            editButton.onclick = function () {
                // Adicione a lógica para editar a postagem
                // (pode redirecionar para uma página de edição)
            };

            var deleteButton = document.createElement("button");
            deleteButton.textContent = "Excluir";
            deleteButton.onclick = function () {
                // Adicione a lógica para excluir a postagem
                // (pode pedir confirmação antes de excluir)
            };

            postDiv.appendChild(editButton);
            postDiv.appendChild(deleteButton);

            adminPostsDiv.appendChild(postDiv);
        }
    }
}

function moveImageToFolder(imagePath) {
    var destinationFolder = "imagem/";
    var fileName = imagePath.split('/').pop();

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("Imagem movida com sucesso para " + destinationFolder + fileName);
        }
    };
    xhr.open("GET", imagePath, true);
    xhr.responseType = "blob";
    xhr.onload = function () {
        var blob = xhr.response;
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;

        var clickEvent = new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: false
        });

        link.dispatchEvent(clickEvent);
    };
    xhr.send();
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

    moveImageToFolder(image);
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

window.onload = function () {
    loadPosts();
    loadAdminPosts();
};
