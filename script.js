// script.js
// ...

// Função para excluir uma postagem
function deletePost(index) {
    var posts = JSON.parse(localStorage.getItem("posts"));
    posts.splice(index, 1);
    localStorage.setItem("posts", JSON.stringify(posts));
    loadPosts();
}

// Função para editar uma postagem
function editPost(index) {
    var posts = JSON.parse(localStorage.getItem("posts"));
    var post = posts[index];
    var updatedTitle = prompt("Novo título:", post.title);
    var updatedText = prompt("Novo texto:", post.text);
    post.title = updatedTitle || post.title;
    post.text = updatedText || post.text;
    localStorage.setItem("posts", JSON.stringify(posts));
    loadPosts();
}

// ...

function mergeScriptsAndStyles() {
    // Combinação de scripts e estilos no index.html
    var styles = document.createElement("link");
    styles.rel = "stylesheet";
    styles.href = "style.css";
    document.head.appendChild(styles);

    var script = document.createElement("script");
    script.src = "script.js";
    document.body.appendChild(script);
}
