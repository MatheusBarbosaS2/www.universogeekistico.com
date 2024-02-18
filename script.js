function expandirConteudo(noticiaId) {
    // Redirecionar para a página da notícia correspondente
    window.location.href = `noticia.html#${noticiaId}`;
}

// Ajustar os detalhes da notícia na página "noticia.html"
document.addEventListener('DOMContentLoaded', function () {
    // Obter o ID da notícia da URL
    const noticiaId = window.location.hash.substring(1);

    // Dados das notícias
    const noticias = {
        "noticia1": {
            "titulo": "MARVEL IRÁ TRAZER OS ‘ETERNOS’ NOVAMENTE AO MCU!",
            "imagem": "imagem/eternoswhatif.jpg",
            "conteudo": "Os Eternos chegaram como uma grande promessa para a Fase 4 do MCU..."
        },
        "noticia2": {
            "titulo": "VAZOU FOTOS DA NOVA SÉRIE DO DEMOLIDOR REVELA FRASE DA CAMPANHA DO REI DO CRIME PARA PREFEITO!",
            "imagem": "imagem/wilsonfiskprefeitopropagranda.png",
            "conteudo": "Mais fotos do set de Demolidor: Renascido chegaram online e estão repletas de grandes momentos..."
        },
        "noticia3": {
            "titulo": "LOKI TERÁ UMA 3ª TEMPORADA NO MCU?",
            "imagem": "imagem/Lokitemporada3.jpg",
            "conteudo": "Se você é fã do deus da mentira e espera notícias sobre a terceira temporada de Loki no streaming..."
        },
        "noticia4": {
            "titulo": "LOKI TERÁ UMA 3ª TEMPORADA NO MCU?",
            "imagem": "imagem/SupermanAntiKryptonita.jpg",
            "conteudo": "A kryptonita é um artefato tão importante na história do Superman que se tornou uma metáfora icônica na cultura pop..."
        }
        // Adicione mais notícias conforme necessário
    };

    // Preencher os detalhes da notícia na página "noticia.html"
    if (noticiaId && noticias[noticiaId]) {
        document.getElementById('titulo').innerText = noticias[noticiaId].titulo;
        document.getElementById('imagem').src = noticias[noticiaId].imagem;
        document.getElementById('conteudo').innerText = noticias[noticiaId].conteudo;
    }
});

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");

    if (n > slides.length) {
        slideIndex = 1;
    }

    if (n < 1) {
        slideIndex = slides.length;
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slideIndex - 1].style.display = "block";
    setTimeout(function () {
        slides[slideIndex - 1].style.display = "none";
        plusSlides(1);
    }, 10000); // Troca de slide a cada 3 segundos
}
