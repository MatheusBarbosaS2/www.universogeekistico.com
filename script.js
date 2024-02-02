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
            var deleteButton = document.createElement("button"); // Novo botão de exclusão

            postDiv.className = "post";
            postTitle.className = "post-title";
            postImage.className = "post-image";
            postText.className = "post-text";

            postTitle.textContent = post.title;

            // Construir o caminho completo para a imagem
            var imagePath = "uploads/" + post.image; // Supondo que as imagens estejam na pasta "uploads"
            postImage.src = imagePath;

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
    var posts = JSON.parse(localStorage.getItem("posts"));
    if (!posts) {
        posts = [];
    }
    
    // Armazenar apenas o nome do arquivo
    var fileName = imageInput.files[0].name;

    var post = {
        title: title,
        image: fileName, // Armazenar apenas o nome do arquivo
        text: text
    };
    posts.unshift(post);
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
    
    // Nova lógica para obter o caminho da imagem
    var image = "";
    var file = imageInput.files[0];
    
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            image = e.target.result;
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
        };
        reader.readAsDataURL(file);
    } else {
        // Se não houver arquivo, mostrar mensagem de erro
        alert("Por favor, selecione uma imagem.");
    }
}

// Carregar as postagens quando a página inicial for carregada
window.onload = loadPosts;
