<?php
// Simulando notícias
$noticias = array(
    array('titulo' => 'Notícia 1', 'descricao1' => 'Descrição 1 da Notícia 1', 'descricao2' => 'Descrição 2 da Notícia 1', 'imagem' => 'imagens/imagem1.jpg'),
    array('titulo' => 'Notícia 2', 'descricao1' => 'Descrição 1 da Notícia 2', 'descricao2' => 'Descrição 2 da Notícia 2', 'imagem' => 'imagens/imagem2.jpg'),
    // Adicione mais notícias conforme necessário
);

$html = '';

foreach ($noticias as $noticia) {
    $html .= '<div class="noticia">';
    $html .= '<h2>' . $noticia['titulo'] . '</h2>';
    $html .= '<p>' . $noticia['descricao1'] . '</p>';
    $html .= '<p>' . $noticia['descricao2'] . '</p>';
    $html .= '<img src="' . $noticia['imagem'] . '" alt="' . $noticia['titulo'] . '">';
    $html .= '</div>';
}

echo json_encode(array('html' => $html));
?>
