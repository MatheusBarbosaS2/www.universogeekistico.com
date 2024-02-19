// Função para ocultar o cabeçalho e o rodapé ao rolar para baixo e mostrá-los ao rolar para cima
let lastScrollTop = 0;
window.addEventListener("scroll", function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll > lastScrollTop) {
        document.querySelector("header").classList.add("hide");
    } else if (currentScroll > lastScrollTop && bottomOffset > 100) {
        // Scroll para baixo
        document.querySelector("footer").classList.add("hide");
    } else {
        // Scroll para cima
        document.querySelector("header").classList.remove("hide");
        document.querySelector("footer").classList.remove("hide");
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Para o Firefox
}, false);
