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

// Função para limitar o texto a três linhas e adicionar os três pontos
postTexts.forEach(postText => {
    const lineHeight = parseFloat(window.getComputedStyle(postText).lineHeight); // Obtém a altura de uma linha
    const maxLines = 3; // Define o número máximo de linhas
    const maxHeight = lineHeight * maxLines; // Calcula a altura máxima baseada no número máximo de linhas
    
    // Verifica se a altura do texto é maior que a altura máxima permitida
    if (postText.scrollHeight > maxHeight) {
        // Define a altura máxima do texto
        postText.style.maxHeight = maxHeight + 'px';
        
        // Adiciona os três pontos no final do texto
        const originalText = postText.textContent.trim(); // Obtém o texto original sem espaços extras no início e no fim
        const slicedText = originalText.slice(0, originalText.lastIndexOf(' ', Math.floor((maxHeight / lineHeight) * 0.9))); // Corta o texto até o último espaço antes de atingir a altura máxima
        postText.textContent = slicedText.trim() + '...'; // Adiciona os três pontos ao final do texto cortado
    }
});

// Script.js

document.addEventListener("DOMContentLoaded", function() {
    // Obter o elemento da contagem de visualizações
    const viewCountElement = document.getElementById("viewCount");

    // Verificar se há um valor armazenado para a contagem de visualizações
    let viewCount = localStorage.getItem("viewCount");

    // Se não houver um valor armazenado, definir a contagem como 0
    if (!viewCount) {
        viewCount = 0;
    } else {
        // Caso contrário, converter o valor para um número
        viewCount = parseInt(viewCount);
    }

    // Incrementar a contagem de visualizações
    viewCount++;

    // Atualizar o elemento da contagem de visualizações
    viewCountElement.textContent = viewCount;

    // Armazenar a contagem atualizada no armazenamento local
    localStorage.setItem("viewCount", viewCount.toString());
});

