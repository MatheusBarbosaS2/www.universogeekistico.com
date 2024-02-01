// script.js
function salvarPostagem() {
    // obter os valores dos campos do formulário
    var titulo = document.getElementById("titulo").value;
    var imagem = document.getElementById("imagem").files[0];
    var texto = document.getElementById("texto").value;

    // criar um objeto FormData para enviar os dados via POST
    var formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("imagem", imagem);
    formData.append("texto", texto);

    // criar um objeto XMLHttpRequest para fazer a requisição ao servidor
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "salvarpostagem.php", true);
    xhr.onload = function() {
        if (xhr.status == 200) {
            // se a resposta do servidor for OK, redirecionar para a página index.html
            window.location.href = "index.html";
        } else {
            // se a resposta do servidor for diferente de OK, mostrar uma mensagem de erro
            alert("Ocorreu um erro ao salvar a postagem. Por favor, tente novamente.");
        }
    };
    xhr.send(formData);

    // impedir o comportamento padrão do formulário
    return false;
}
