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
        };
        reader.readAsDataURL(image);

        // Redirecionar para a página inicial
        window.location.href = "index.html";
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}
