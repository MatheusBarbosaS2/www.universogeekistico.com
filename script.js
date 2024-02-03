function expandirConteudo(elementId, botaoId) {
    var conteudo = document.getElementById(elementId);
    var botao = document.getElementById(botaoId);

    if (elementId === 'conteudoNoticia4') {
        var textoCompletoNoticia4 = "Há alguns meses, Kevin Feige, diretor criativo da Marvel Studios, revelou que o roteiro preliminar de ‘Homem-Aranha 4‘ já está pronto. Obviamente, o cineasta não quis dar detalhes sobre a trama, mas o insider Daniel Richtman revelou diversos detalhes intrigantes da sequência no Patreon, plataforma de compartilhamento de documentos. Segundo ele, ‘Homem-Aranha 4‘ deve finalmente abrir o caminho para uma potencial fusão do Aranhaverso da Sony com o MCU. O que não sabemos é se isso significa que Peter está indo para o mesmo mundo que ‘Venom‘, ‘Morbius‘ e ‘Madame Teia‘ ou se esses personagens estão sendo puxados para a Terra-616 a tempo de ‘Vingadores: Guerras Secretas‘. Com isso em mente, é provável que tenhamos o ‘Homem-Aranha 4‘, uma aparição de Holland, Tobey Maguire e Andrew Garfield nos próximos filmes dos ‘Vingadores‘, e então ele volta para a Sony enquanto Kevin Feige muda o foco para o X-Men e Quarteto Fantástico. De acordo com suas fontes, a trama do quarto filme deve começar mais ‘pé no chão’, com Peter Parker (Tom Holland) atuando como o amigão da vizinhança, até descobrir que a origem da criminalidade que enfrenta vem do Rei do Crime, vivido por Vincent D’Onofrio. Não foi mencionado se D’Onofrio terá um papel de destaque na sequência ou se fará apenas uma participação especial. Também foi dito que as gravações devem ser iniciadas no fim de 2024.";

        if (conteudo.innerHTML === textoCompleto) {
            // Se o conteúdo está completo, exibe menos
            conteudo.innerHTML = "Há alguns meses, Kevin Feige, diretor criativo da Marvel Studios, revelou que o roteiro preliminar de ‘Homem-Aranha 4‘ já está pronto...";
            botao.innerHTML = "Saiba Mais";
        } else {
            // Se não, exibe mais
            conteudo.innerHTML = textoCompleto;
            botao.innerHTML = "Mostrar Menos";
        }
    } else if (elementId === 'conteudoNoticia3') {
        // Conteúdo da Notícia 3
        var textoCompletoNoticia3 = "Criador das histórias em quadrinhos de Invencível, The Walking Dead e etc… Robert Kirkman entregou o jogo sobre a escalação de um herói de outra companhia! O idealizador da animação original do Prime Video revelou quem vai interpretar Sentinela na Marvel Studios. De acordo com o produtor executivo da série, Steven Yeun foi o escolhido para tal função. Em entrevista para o quadrinista David Finch, o criador de Invencível trouxe a notícia bombástica. “O meu bom amigo Steven Yeun vai interpretar Sentinela em um filme. Ele me ligou, porque foi provar o uniforme”, explicou Kirkman. “Não acho que isso seja um spoiler ou algo que vá colocar alguém em apuros. Não sei, talvez. Veremos. Não me interessa. Não trabalho para a Marvel. O que é que eles vão fazer comigo?”Kirkman e Yeun trabalham juntos na animação Invencível. O ator de The Walking Dead dubla o protagonista da série –o jovem Mark Grayson. O herói, assim como Sentinela na Marvel, usam as mesmas cores em seu uniforme –o que chamou a atenção da dupla. “Steven me ligou e disse que tinha acabado de voltar da prova do uniforme do Sentinela. Ele me falou: ‘Acho que só faço super-heróis amarelos e azuis’. Ele disse que estava experimentando a roupa e ficou tipo: ‘ah, não! Eu esqueci que Invencível também usava essas cores’”, contou Kirkman em meio a risadas. Segundo os rumores, Sentinela deve fazer sua estreia em Thunderbolts.";

        if (conteudo.innerHTML === textoCompletoNoticia2) {
            conteudo.innerHTML = "Criador das histórias em quadrinhos de Invencível, The Walking Dead e etc… Robert Kirkman entregou o jogo sobre a escalação de um herói de outra companhia! O idealizador da animação original do Prime Video revelou quem vai interpretar Sentinela na Marvel Studios...";
            botao.innerHTML = "Saiba Mais";
        } else {
            conteudo.innerHTML = textoCompletoNoticia2;
            botao.innerHTML = "Mostrar Menos";
        }
    } else if (elementId === 'conteudoNoticia2') {
        // Conteúdo da Notícia 2
        var textoCompletoNoticia2 = "Se você é fã do deus da mentira e espera notícias sobre a terceira temporada de Loki no streaming, então você está no lugar certo. Já adianto que o roteirista principal da série do MCU, Eric Martin, revelou, em recente entrevista ao site Cinema Blend, que pensou Loki, como uma série que nasceu para apenas duas temporadas. Mas tenha calma, a princípio, tudo pode mudar quando estamos falando de séries, não é? O escritor e o time de produção do projeto não imaginaram a possibilidade de uma 3ª temporada, mas também não foram categóricos na entrevista, negando totalmente essa possibilidade, então, bora explorar essa chance. Bem, ainda na entrevista, o principal roteirista afirmou: “Nós abordamos isso [a série] como um livro de duas partes. Primeira temporada, é a primeira parte. Segunda temporada, nós fechamos o livro sobre Loki. Onde ela poderia ir depois disso, não sei. Eu só queria contar uma história cheia e completa através de duas temporadas”. Pelo menos, por enquanto, não há nenhuma notícia ou indício de continuação. Mas como tudo pode mudar, em se tratando de séries, não vamos desistir tão fácil. Kevin Wright, o produtor, anteriormente às declarações de Martin, disse que houve reflexões sobre o que seria um “próximo passo”, e admitiu que há, sim, um “entusiasmo por isso internamente”. Ele afirmou por fim que concorda, que aqui há uma conclusão, mas que Loki sai disso com outras possibilidades e que “novos livros podem ser feitos”. E como o multiverso da Marvel está crescendo, com outras aventuras previstas como: “Vingadores: A Dinastia Kang” e “Vingadores: Guerras Secretas”, Loki pode se encaixar nesse quebra-cabeça facilmente, afinal ele é o “deus da trapaça”.";

        if (conteudo.innerHTML === textoCompletoNoticia3) {
            conteudo.innerHTML = "Se você é fã do deus da mentira e espera notícias sobre a terceira temporada de Loki no streaming, então você está no lugar certo. Já adianto que o roteirista principal da série do MCU, Eric Martin, revelou...";
            botao.innerHTML = "Saiba Mais";
        } else {
            conteudo.innerHTML = textoCompletoNoticia3;
            botao.innerHTML = "Mostrar Menos";
        }
    } else if (elementId === 'conteudoNoticia1') {
        // Conteúdo da Notícia 1
        var textoCompletoNoticia1 = "A kryptonita é um artefato tão importante na história do Superman que se tornou uma metáfora icônica na cultura pop, um sinônimo de fraqueza, mas aconteceu algo nos quadrinhos que revolucionou essa noção. *Atenção para spoilers de Superman: Lost #8!* Na minissérie em 10 edições Superman: Lost, a trama, que acontece fora da cronologia principal, mostra o Superman vivenciando uma das jornadas mais angustiantes de sua vida, depois de viajar por uma singularidade e chegar a uma localidade desconhecida, a trilhões de anos-luz da Terra. Mas por que o traje banco isola a kryptonita? Embora tenha conseguido se estabelecer em um planeta, a aventura espacial mostra ele fazendo de tudo para voltar para casa. Em Superman: Lost #8, lançado recentemente, vemos Superman na Terra, no presente, ainda tentando se ajustar à vida depois de viver no espaço por duas décadas. Vemos o herói no meio do oceano enfrentando um Metallo bastante aprimorado, que agora habita um corpo do tamanho de um kaiju após absorver vários navios de guerra. Superman tenta falar com Metallo, mas a conversa não funciona, e, então, Supergirl entra em cena, vestindo o traje branco do Kit de Sobrevivência Pessoal que Clark adquiriu no espaço. Kara observa que, embora o uniforme todo branco não seja forrado de chumbo, ele protege da radiação, tornando a kryptonita do vilão inútil contra os kryptonianos. Embora essa história esteja desconectada da cronologia principal, sua narrativa épica e as novidades científicas importantes que ela têm tudo para que os elementos introduzidos pela trama sejam incorporados ao cânone.";

        if (conteudo.innerHTML === textoCompletoNoticia4) {
            conteudo.innerHTML = "A kryptonita é um artefato tão importante na história do Superman que se tornou uma metáfora icônica na cultura pop, um sinônimo de fraqueza, mas aconteceu algo nos quadrinhos que revolucionou essa noção...";
            botao.innerHTML = "Saiba Mais";
        } else {
            conteudo.innerHTML = textoCompletoNoticia4;
            botao.innerHTML = "Mostrar Menos";
        }
    }
}


