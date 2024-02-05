<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $titulo = $_POST["titulo"];
    $descricao1 = $_POST["descricao1"];
    $descricao2 = $_POST["descricao2"];
    
    // Diretório para armazenar as imagens
    $diretorioImagens = "imagens/";
    
    // Verifica se o diretório existe, senão, cria
    if (!is_dir($diretorioImagens)) {
        mkdir($diretorioImagens);
    }

    // Trata a imagem
    $imagemNome = basename($_FILES["imagem"]["name"]);
    $imagemCaminho = $diretorioImagens . $imagemNome;

    // Move a imagem para o diretório
    if (move_uploaded_file($_FILES["imagem"]["tmp_name"], $imagemCaminho)) {
        // Cria ou abre o arquivo index.html para escrita
        $indexFile = fopen("index.html", "a");

        // Escreve as informações no arquivo
        fwrite($indexFile, "<h2>$titulo</h2>");
        fwrite($indexFile, "<p>$descricao1</p>");
        fwrite($indexFile, "<p>$descricao2</p>");
        fwrite($indexFile, "<img src='$imagemCaminho' alt='Imagem da notícia'>");
        fwrite($indexFile, "<hr>");

        // Fecha o arquivo
        fclose($indexFile);

        echo "Notícia postada com sucesso!";
    } else {
        echo "Erro ao fazer o upload da imagem.";
    }
} else {
    echo "Requisição inválida.";
}
?>
