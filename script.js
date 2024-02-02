// script.js
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
            // Redirecionar para a página inicial
            window.location.href = "index.html";
        };
        reader.readAsDataURL(image);
    } else {
        alert("Por favor, preencha todos os campos.");
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
