// script.js
// Função para carregar as postagens do localStorage
function loadPosts() {
    // Pegar o elemento div que vai conter as postagens
    var postsDiv = document.getElementById("posts");
    // Limpar o conteúdo da div
    postsDiv.innerHTML = "";
    // Pegar o array de postagens do localStorage
    var posts = JSON.parse(localStorage.getItem("posts"));
    // Se o array não for nulo, iterar sobre ele
    if (posts) {
        for (var i = 0; i < posts.length; i++) {
            // Pegar a postagem atual
            var post = posts[i];
            // Criar os elementos html para a postagem
            var postDiv = document.createElement("div");
            var postTitle = document.createElement("h2");
            var postImage = document.createElement("img");
            var postText = document.createElement("p");
            // Atribuir as classes css aos elementos
            postDiv.className = "post";
            postTitle.className = "post-title";
            postImage.className = "post-image";
            postText.className = "post-text";
            // Atribuir os valores da postagem aos elementos
            postTitle.textContent = post.title;
            postImage.src = post.image;
            postText.textContent = post.text;
            // Adicionar os elementos à div da postagem
            postDiv.appendChild(postTitle);
            postDiv.appendChild(postImage);
            postDiv.appendChild(postText);
            // Adicionar a div da postagem à div principal
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
    var imageInput = document.getElementById("post-image"); // Corrigido o ID aqui
    var textInput = document.getElementById("text");

    // Pegar os valores do formulário
    var title = titleInput.value;
    var image = imageInput.files[0]; // Usar files para campos de arquivo
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
