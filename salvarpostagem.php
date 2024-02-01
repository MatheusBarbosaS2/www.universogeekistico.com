<?php
// salvarpostagem.php
// verificar se os dados foram enviados via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // obter os valores dos campos do formulário
    $titulo = $_POST["titulo"];
    $imagem = $_FILES["imagem"];
    $texto = $_POST["texto"];

    // validar os dados
    if (empty($titulo) || empty($imagem) || empty($texto)) {
        // se algum campo estiver vazio, retornar um código de erro
        http_response_code(400);
        exit();
    }

    // definir o caminho onde as imagens serão salvas
    $pasta = "imagens/";

    // gerar um nome aleatório para a imagem
    $nome = md5(uniqid(rand(), true)) . "." . pathinfo($imagem["name"], PATHINFO_EXTENSION);

    // mover a imagem do diretório temporário para a pasta definida
    if (move_uploaded_file($imagem["tmp_name"], $pasta . $nome)) {
        // se a imagem foi movida com sucesso, salvar os dados da postagem em um arquivo JSON
        // ler o arquivo JSON existente
        $arquivo = "postagens.json";
        $json = file_get_contents($arquivo);
        $postagens = json_decode($json, true);

        // criar um objeto com os dados da nova postagem
        $postagem = array(
            "titulo" => $titulo,
            "imagem" => $pasta . $nome,
            "texto" => $texto
        );

        // adicionar a nova postagem no início do array de postagens
        array_unshift($postagens, $postagem);

        // converter o array de postagens em uma string JSON
        $json = json_encode($postagens, JSON_PRETTY_PRINT);

        // escrever a string JSON no arquivo
        if (file_put_contents($arquivo, $json)) {
            // se o arquivo foi escrito com sucesso, retornar um código de sucesso
            http_response_code(200);
            exit();
        } else {
            // se o arquivo não foi escrito com sucesso, retornar um código de erro
            http_response_code(500);
            exit();
        }
    } else {
        // se a imagem não foi movida com sucesso, retornar um código de erro
        http_response_code(500);
        exit();
    }
} else {
    // se os dados não foram enviados via POST, retornar um código de erro
    http_response_code(405);
    exit();
}
