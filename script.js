// script.js

// Função para carregar as postagens do localStorage
function loadPosts() {
    // ... (restante do código)

    // Adicionar os elementos à div da postagem
    postDiv.appendChild(postTitle);

    // Verificar se a imagem foi fornecida antes de definir o src
    if (post.image) {
        var postImage = document.createElement("img");
        postImage.className = "post-image";
        postImage.src = post.image;
        postDiv.appendChild(postImage);
    }

    postDiv.appendChild(postText);
    postDiv.appendChild(deleteButton);

    // Adicionar a div da postagem à div principal
    postsDiv.appendChild(postDiv);
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

// Função para excluir uma postagem do localStorage
function deletePost(index) {
    var posts = JSON.parse(localStorage.getItem("posts"));
    posts.splice(index, 1);
    localStorage.setItem("posts", JSON.stringify(posts));
    loadPosts();
}

// Função para criar uma postagem nova a partir do formulário
function createPost() {
    var titleInput = document.getElementById("title");
    var imageInput = document.getElementById("image");
    var textInput = document.getElementById("text");

    var title = titleInput.value;
    var text = textInput.value;

    // Validar se os campos foram preenchidos
    if (title && text) {
        var imageFile = imageInput.files[0];

        // Validar se um arquivo de imagem foi selecionado
        if (imageFile) {
            // Usar FileReader para ler o conteúdo do arquivo
            var reader = new FileReader();
            reader.onload = function (event) {
                var imageBase64 = event.target.result;
                addPost(title, imageBase64, text);
                window.location.href = "index.html";
            };
            reader.readAsDataURL(imageFile);
        } else {
            alert("Por favor, selecione uma imagem.");
        }
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

// Carregar as postagens quando a página inicial for carregada
window.onload = loadPosts;
