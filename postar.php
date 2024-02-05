<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $titulo = $_POST['titulo'];
    $descricao1 = $_POST['descricao1'];
    $descricao2 = $_POST['descricao2'];
    
    // Verificar se a pasta 'imagens' existe, se não, criar
    if (!file_exists('imagens')) {
        mkdir('imagens', 0777, true);
    }

    $imagem = $_FILES['imagem'];
    $imagemNome = 'imagens/' . basename($imagem['name']);
    move_uploaded_file($imagem['tmp_name'], $imagemNome);

    // Aqui você pode salvar os dados no banco de dados ou em um arquivo, dependendo da sua aplicação.

    $response = array('success' => true, 'message' => 'Notícia postada com sucesso!');
    echo json_encode($response);
} else {
    echo 'Método não permitido';
}
?>
