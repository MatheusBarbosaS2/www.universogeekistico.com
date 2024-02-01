// script.js
// ... (código existente)

// Função para excluir uma postagem do localStorage
function deletePost(index) {
    var posts = JSON.parse(localStorage.getItem("posts"));
    if (posts && posts.length > index) {
        posts.splice(index, 1);
        localStorage.setItem("posts", JSON.stringify(posts));
        loadPosts(); // Recarregar as postagens após a exclusão
    }
}

// ... (código existente)

// Função para carregar as postagens do localStorage
function loadPosts() {
    // ... (código existente)

    // Adicionar botão de exclusão para cada postagem
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Excluir";
    deleteButton.onclick = function() {
        deletePost(i);
    };
    postDiv.appendChild(deleteButton);

    // ... (código existente)
}
