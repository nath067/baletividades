// Seleciona o botão de login com o ID 'entrar'
const fazerlogin = document.getElementById('entrar');

// Define uma função assíncrona que será executada ao clicar no botão de login
fazerlogin.onclick = async function (e) {
    // Previne o comportamento padrão do botão de submit, que seria recarregar a página
    e.preventDefault();

    // Obtém os valores dos campos de entrada de email e senha
    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;

    // Cria um objeto com os dados de login (email e senha)
    let data = { email, senha };

    // Envia uma requisição HTTP POST para a URL especificada
    // A requisição inclui o objeto 'data' no corpo, convertido para JSON
    const response = await fetch('http://localhost:3001/api/login/usuario', {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(data)
    });

    // Converte a resposta da requisição para JSON
    let content = await response.json();
    console.log(content);

    // Verifica se a resposta indica sucesso no login
    if (content.success) {
        // Adiciona a verificação para o email específico
        let user = content.data[0];
        if (email === "nathaligsantos@gmail.com") {
            user.tipo_usuario = "admin"; // Define como administrador
        } else {
            user.tipo_usuario = "user"; // Define como usuário normal
        }

        // Armazena os dados do usuário no localStorage do navegador
        localStorage.setItem('usuario', JSON.stringify(user));
        console.log(user);

        // Exibe um alerta de sucesso no login e redireciona o usuário para outra página
        alert('Sucesso no login!');
        window.location.href = '../categorias/categorias.html';
    } else {
        // Exibe um alerta em caso de erro no login
        alert('Erro no login, tente novamente!');
    }
};