// Seleciona o botão com o ID 'cadastrar'
const button = document.getElementById('cadastrar');

// Define uma função assíncrona que será executada ao clicar no botão
button.onclick = async function() {
    // Obtém os valores dos campos de entrada com os IDs correspondentes
    let nome = document.getElementById('nome').value;
    let email = document.getElementById('email').value;
    let nome_usuario = document.getElementById('usuario').value;
    let senha = document.getElementById('senha').value;

    // Cria um objeto contendo os dados coletados dos campos de entrada
    let data = {nome, email, nome_usuario, senha};

    // Envia uma requisição HTTP POST para a URL especificada
    // A requisição inclui o objeto 'data' no corpo, convertido para JSON
    const response = await fetch('http://localhost:3001/api/store/usuario', {
        method: 'POST',
        headers: {'Content-type': 'application/json;charset=UTF-8'},
        body: JSON.stringify(data)
    });

    // Converte a resposta da requisição para JSON
    let content = await response.json();

    // Verifica se a resposta indica sucesso e exibe um alerta apropriado
    if (content.success) {
        alert('Sucesso!');
    } else {
        alert('Algo deu errado, tente novamente!');
    }

    // Recarrega a página após a resposta ser processada
    let reload = await content;
    reload = location.reload();
};
