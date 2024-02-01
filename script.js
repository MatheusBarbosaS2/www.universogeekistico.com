// script.js

// Função para carregar as postagens do localStorage
function loadPosts() {
    var postsDiv = document.getElementById("noticias");
    postsDiv.innerHTML = "";

    var posts = JSON.parse(localStorage.getItem("posts"));

    if (posts) {
        for (var i = 0; i < posts.length; i++) {
            var post = posts[i];
            var postDiv = document.createElement("div");
            var postTitle = document.createElement("h2");
            var postImage = document.createElement("img");
            var postText = document.createElement("p");
            var showMoreButton = document.createElement("button");

            postDiv.className = "noticia";
            postTitle.textContent = post.title;
            postImage.src = post.image;
            postText.textContent = post.text;
            showMoreButton.textContent = "Saiba Mais";
            showMoreButton.addEventListener("click", function () {
                expandirConteudo(post.text);
            });

            postDiv.appendChild(postTitle);
            postDiv.appendChild(postImage);
            postDiv.appendChild(postText);
            postDiv.appendChild(showMoreButton);

            postsDiv.appendChild(postDiv);
        }
    }
}

// Função para expandir o conteúdo da postagem
function expandirConteudo(text) {
    // Implementação da função expandirConteudo
    // (mantenha seu código atual aqui)
}

// Carregar as postagens quando a página inicial for carregada
window.onload = loadPosts;

// Função para criar uma postagem nova a partir do formulário
function createPost() {
    var titleInput = document.getElementById("titulo");
    var imageInput = document.getElementById("imagem");
    var desc1Input = document.getElementById("descricao1");
    var desc2Input = document.getElementById("descricao2");

    var title = titleInput.value;
    var image = imageInput.files[0];
    var desc1 = desc1Input.value;
    var desc2 = desc2Input.value;

    if (title && image && desc1 && desc2) {
        var reader = new FileReader();
        reader.onload = function (e) {
            addPost(title, e.target.result, desc1, desc2);
            window.location.href = "index.html";
        };
        reader.readAsDataURL(image);
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

// Função para adicionar uma postagem nova ao localStorage
function addPost(title, image, desc1, desc2) {
    var posts = JSON.parse(localStorage.getItem("posts"));
    if (!posts) {
        posts = [];
    }

    var post = {
        title: title,
        image: image,
        text: desc1 + desc2
    };

    posts.unshift(post);
    localStorage.setItem("posts", JSON.stringify(posts));
}
