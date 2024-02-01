// script.js
// Função para carregar as postagens do localStorage
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

// Função para adicionar uma postagem nova ao localStorage
function addPost(title, image, text) {
    // Pegar o array de postagens do localStorage
    var posts = JSON.parse(localStorage.getItem("posts"));
    // Se o array for nulo, criar um novo
    if (!posts) {
        posts = [];
    }
    // Criar um objeto para a postagem nova
    var post = {
        title: title,
        image: image,
        text: text
    };
    // Adicionar a postagem nova ao início do array
    posts.unshift(post);
    // Salvar o array no localStorage
    localStorage.setItem("posts", JSON.stringify(posts));
}

// Função para criar uma postagem nova a partir do formulário
function createPost() {
    // Pegar os elementos do formulário
    var titleInput = document.getElementById("title");
    var imageInput = document.getElementById("image");
    var textInput = document.getElementById("text");
    // Pegar os valores do formulário
    var title = titleInput.value;
    var image = imageInput.value;
    var text = textInput.value;
    // Validar os valores
    if (title && image && text) {
        // Adicionar a postagem nova ao localStorage
        addPost(title, image, text);
        // Redirecionar para a página inicial
        window.location.href = "index.html";
    } else {
        // Mostrar uma mensagem de erro
        alert("Por favor, preencha todos os campos.");
    }
}

// Carregar as postagens quando a página inicial for carregada
window.onload = loadPosts;
