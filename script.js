// script.js
// Função para carregar as postagens do localStorage
function loadPosts() {
    // Pegar o elemento div que vai conter as postagens
    var postsDiv = document.getElementById("noticias");
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
            postDiv.className = "noticia";
            postTitle.className = "noticia-title";
            postImage.className = "noticia-image";
            postText.className = "noticia-text";
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

// Restante do código do script.js permanece inalterado

// Carregar as postagens quando a página inicial for carregada
window.onload = loadPosts;

// Função para criar uma postagem nova a partir do formulário
function adicionarNoticia() {
    var tituloInput = document.getElementById("titulo");
    var imagemInput = document.getElementById("imagem");
    var descricao1Input = document.getElementById("descricao1");
    var descricao2Input = document.getElementById("descricao2");

    var titulo = tituloInput.value;
    var imagem = imagemInput.files[0];
    var descricao1 = descricao1Input.value;
    var descricao2 = descricao2Input.value;

    if (titulo && imagem && descricao1 && descricao2) {
        var reader = new FileReader();
        reader.onload = function (e) {
            addPost(titulo, e.target.result, descricao1, descricao2);
            window.location.href = "index.html";
        };
        reader.readAsDataURL(imagem);
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}
