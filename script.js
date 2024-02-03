// script.js

function adicionarNoticia() {
    var tituloInput = document.getElementById("titulo");
    var descricao1Input = document.getElementById("descricao1");
    var descricao2Input = document.getElementById("descricao2");
    var imagemInput = document.getElementById("imagem");

    var titulo = tituloInput.value;
    var descricao1 = descricao1Input.value;
    var descricao2 = descricao2Input.value;
    var imagem = imagemInput.files[0];

    if (titulo && descricao1 && descricao2 && imagem) {
        saveImage(imagem, titulo + ".jpg"); // Salva a imagem na pasta "imagem"
        addPost(titulo, "imagem/" + titulo + ".jpg", descricao1, descricao2);
        alert("Notícia adicionada com sucesso!");
        resetForm();
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

function addPost(titulo, imagem, descricao1, descricao2) {
    var posts = JSON.parse(localStorage.getItem("posts")) || [];
    var post = {
        titulo: titulo,
        imagem: imagem,
        descricao1: descricao1,
        descricao2: descricao2
    };
    posts.unshift(post);
    localStorage.setItem("posts", JSON.stringify(posts));
}

function saveImage(file, fileName) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        var base64Image = reader.result.split(',')[1];
        var binaryImage = atob(base64Image);
        var arrayBuffer = new ArrayBuffer(binaryImage.length);
        var uint8Array = new Uint8Array(arrayBuffer);

        for (var i = 0; i < binaryImage.length; i++) {
            uint8Array[i] = binaryImage.charCodeAt(i);
        }

        var blob = new Blob([uint8Array], { type: 'image/jpeg' });
        var url = URL.createObjectURL(blob);

        var a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();

        URL.revokeObjectURL(url);
    };
}

// Função para carregar todas as postagens e exibi-las na página inicial
function loadAllPosts() {
    var postsDiv = document.getElementById("posts");
    postsDiv.innerHTML = "";

    var posts = JSON.parse(localStorage.getItem("posts")) || [];

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

        postTitle.textContent = post.titulo;
        postImage.src = post.imagem;
        postText.textContent = post.descricao1 + "\n\n" + post.descricao2;

        postDiv.appendChild(postTitle);
        postDiv.appendChild(postImage);
        postDiv.appendChild(postText);

        postsDiv.appendChild(postDiv);
    }
}

window.onload = function () {
    loadAllPosts();
};

function resetForm() {
    document.getElementById("formNoticia").reset();
}
