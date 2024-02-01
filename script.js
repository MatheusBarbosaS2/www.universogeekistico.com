// script.js
// Função para criar um elemento HTML com atributos e conteúdo
function criarElemento(tag, atributos, conteudo) {
    let elemento = document.createElement(tag);
    for (let chave in atributos) {
        elemento.setAttribute(chave, atributos[chave]);
    }
    if (conteudo) {
        elemento.innerHTML = conteudo;
    }
    return elemento;
}

// Função para adicionar uma postagem nova no topo da página index.html
function adicionarPostagem(titulo, imagem, texto) {
    // Criar um elemento div com a classe postagem
    let postagem = criarElemento("div", {class: "postagem"});
    // Criar um elemento h2 com o título da postagem
    let h2 = criarElemento("h2", {}, titulo);
    // Criar um elemento img com a imagem da postagem
    let img = criarElemento("img", {src: imagem});
    // Criar um elemento p com o texto da postagem
    let p = criarElemento("p", {}, texto);
    // Adicionar os elementos h2, img e p dentro da div postagem
    postagem.appendChild(h2);
    postagem.appendChild(img);
    postagem.appendChild(p);
    // Selecionar o elemento div com o id container
    let container = document.getElementById("container");
    // Adicionar a div postagem no topo do container
    container.insertBefore(postagem, container.firstChild);
}

// Função para enviar os dados do formulário da página postagemnova.html
function enviarFormulario(evento) {
    // Evitar o comportamento padrão do formulário (recarregar a página)
    evento.preventDefault();
    // Selecionar os elementos do formulário
    let titulo = document.getElementById("titulo");
    let imagem = document.getElementById("imagem");
    let texto = document.getElementById("texto");
    // Verificar se os campos estão preenchidos
    if (titulo.value && imagem.files[0] && texto.value) {
        // Ler o arquivo de imagem como uma URL
        let reader = new FileReader();
        reader.readAsDataURL(imagem.files[0]);
        reader.onload = function() {
            // Obter a URL da imagem
            let url = reader.result;
            // Adicionar a postagem nova na página index.html
            adicionarPostagem(titulo.value, url, texto.value);
            // Limpar os campos do formulário
            titulo.value = "";
            imagem.value = "";
            texto.value = "";
            // Redirecionar para a página index.html
            window.location.href = "index.html";
        }
    } else {
        // Alertar o usuário para preencher os campos
        alert("Por favor, preencha todos os campos.");
    }
}

// Verificar se a página é postagemnova.html
if (window.location.pathname.endsWith("postagemnova.html")) {
    // Selecionar o elemento form com o id form
    let form = document.getElementById("form");
    // Adicionar um evento de submit ao formulário
    form.addEventListener("submit", enviarFormulario);
}
