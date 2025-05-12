document.addEventListener("DOMContentLoaded", () => {
  const noticias = document.getElementById("noticias");

  const postagens = JSON.parse(localStorage.getItem("postagens")) || [];

  postagens.forEach((postagem, index) => {
    const div = document.createElement("div");
    div.className = "noticia";

    const titulo = document.createElement("h2");
    titulo.textContent = postagem.titulo;

    const autor = document.createElement("p");
    autor.innerHTML = `<strong>Autor:</strong> ${postagem.autor}`;

    const conteudo = document.createElement("p");
    conteudo.id = `conteudo-${index}`;
    conteudo.textContent = postagem.conteudo.substring(0, 150) + "...";

    const saibaMais = document.createElement("button");
    saibaMais.textContent = "Saiba Mais";
    saibaMais.id = `btn-${index}`;
    saibaMais.onclick = () => expandirConteudo(`conteudo-${index}`, `btn-${index}`, postagem.conteudo);

    div.appendChild(titulo);
    div.appendChild(autor);
    div.appendChild(conteudo);
    div.appendChild(saibaMais);

    if (postagem.imagem) {
      const imagem = document.createElement("img");
      imagem.src = postagem.imagem;
      div.appendChild(imagem);
    }

    noticias.appendChild(div);
  });
});

function expandirConteudo(idParagrafo, idBotao, conteudoCompleto) {
  const paragrafo = document.getElementById(idParagrafo);
  const botao = document.getElementById(idBotao);

  if (botao.textContent === "Saiba Mais") {
    paragrafo.textContent = conteudoCompleto;
    botao.textContent = "Mostrar Menos";
  } else {
    paragrafo.textContent = conteudoCompleto.substring(0, 150) + "...";
    botao.textContent = "Saiba Mais";
  }
}
