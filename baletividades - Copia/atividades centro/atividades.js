const usuario_logado = JSON.parse(localStorage.getItem('usuario'));
console.log(usuario_logado); // Exibe o objeto do usuário logado no console

// Exibe o ID do usuário logado no console
console.log(usuario_logado.id);

// Obtém referências aos elementos HTML pelo ID
const publicar_atividade = document.getElementById('botao_publicar_atividade');
const formulario_atividade = document.getElementById('formulario_atividade');
const botao_postar_atv = document.getElementById('botao_postar_atv');
const cancelar_postar_atv = document.getElementById('cancelar_postar_atv');

// Verifica o tipo de usuário e oculta o botão de criar atividades para usuários não admins
if (usuario_logado.tipo_usuario !== "admin") {
    publicar_atividade.style.display = 'none'; // Esconde o botão de publicar atividade
}

// Adiciona um evento de clique ao botão 'publicar_atividade' para exibir o formulário
publicar_atividade.addEventListener('click', function (event) {
    formulario_atividade.style.display = 'flex'; // Mostra o formulário ao usuário
});

// Adiciona um evento de clique ao botão 'cancelar_postar_atv' para esconder o formulário e resetar os campos
cancelar_postar_atv.addEventListener('click', function (event) {
    formulario_atividade.style.display = 'none'; // Oculta o formulário
    formulario_atividade.reset(); // Reseta os campos do formulário
});

// ----------------- POSTAR ATIVIDADE ---------------------

// Define a ação a ser executada quando o botão 'botao_postar_atv' for clicado
botao_postar_atv.onclick = async function () {
    // Obtém o formulário de atividade pelo ID
    let form = document.getElementById('formulario_atividade');
    // Cria um objeto FormData com os dados do formulário
    let dadosForm = new FormData(form);

    // Adiciona o tipo de atividade à requisição
    dadosForm.append('tipo_atividade', 'centro'); // Adicionando o tipo "centro" à atividade

    // Envia uma requisição POST para o backend com os dados do formulário
    const response = await fetch('http://localhost:3001/api/postar/atividade', {
        method: 'POST',
        body: dadosForm // Envia os dados do formulário como o corpo da requisição
    });

    let content = await response.json(); // Converte a resposta do servidor para JSON
    console.log(content); // Exibe a resposta no console

    if (content.success) {
        alert('Sucesso!'); // Mostra uma mensagem de sucesso ao usuário

        // Oculta o formulário e reseta os campos após o sucesso
        formulario_atividade.style.display = 'none';
        formulario_atividade.reset();
        window.location.reload()
    } else {
        alert('Algo deu errado, tente novamente!'); // Mostra uma mensagem de erro ao usuário
    }
};

document.addEventListener('DOMContentLoaded', async () => {
    // Define o tipo de atividade que você deseja buscar, por exemplo "centro"
    const tipo_atividade = 'centro';  // Este valor pode ser dinâmico com base no contexto da página

    const response = await fetch(`http://localhost:3001/api/get/atividade/${tipo_atividade}`, {
        method: 'GET', // Define o método HTTP como GET
        headers: { 'Content-Type': 'application/json' } // Define o cabeçalho da requisição como JSON
    });

    const result = await response.json();

    console.log(result); // Exibe o resultado no console

    if (result.success) {
        
        console.log('Resposta da requisição:', result);
        // Se a requisição for bem-sucedida, seleciona o elemento que conterá a lista de atividades
        const lista_atividades = document.getElementById('lista_atividades');
        result.data.forEach(atividade => {

            // Cria um elemento 'div' para conter a atividade
            const caixa_atividade = document.createElement('div');
            caixa_atividade.className = 'caixa_atividade'; // Adiciona uma classe para estilização

            // Cria um elemento 'img' para a imagem da atividade
            const img = document.createElement('img');
            img.className = 'foto_atividade'; // Adiciona uma classe para estilização
            img.src = '../back/src/uploads/' + atividade.imagem; // Define a fonte da imagem

            // Cria um 'div' para as informações da atividade
            const info_atividade = document.createElement('div');
            info_atividade.className = 'info_atividade'; // Adiciona uma classe para estilização

            // Cria um 'div' para o texto da atividade
            const texto_atividade = document.createElement('div');
            texto_atividade.className = 'texto_atividade'; // Adiciona uma classe para estilização

            // Cria um elemento 'h3' para o nome da atividade
            const nome = document.createElement('h3');
            nome.className = 'nome'; // Adiciona uma classe para estilização
            nome.textContent = atividade.nome; // Define o texto do nome da atividade

            // Cria um 'p' para o nível da atividade
            const nivel_texto = document.createElement('p');
            nivel_texto.className = 'nivel_texto'; // Adiciona uma classe para estilização
            nivel_texto.textContent = 'Nível: ' + atividade.nivel; // Define o texto do nível da atividade

            // Cria um 'div' para a avaliação da atividade
            const avaliacao = document.createElement('div');
            avaliacao.className = 'avaliacao'; // Adiciona uma classe para estilização

            // Cria um 'span' para representar uma estrela na avaliação
            const estrela = document.createElement('span');
            estrela.className = 'estrela'; // Adiciona uma classe para estilização

            // Cria um 'div' para o botão de salvar a atividade
            const salvar = document.createElement('div');
            salvar.className = 'salvar'; // Adiciona uma classe para estilização

            // Cria um botão para salvar a atividade
            const botao_salvar = document.createElement('button');
            botao_salvar.className = 'botao_salvar'; // Adiciona uma classe para estilização
            botao_salvar.textContent = 'Salvar'; // Define o texto do botão

            // Cria um botão para visualizar a descrição da atividade
            const botao_ver_descricao = document.createElement('button');
            botao_ver_descricao.className = 'botao_descricao'; // Adiciona uma classe para estilização
            botao_ver_descricao.textContent = 'Ver Descrição'; // Define o texto do botão

            // Monta a estrutura do 'div' de informações da atividade
            info_atividade.appendChild(texto_atividade); // Adiciona o 'div' de texto da atividade
            texto_atividade.appendChild(nome); // Adiciona o nome da atividade
            texto_atividade.appendChild(nivel_texto); // Adiciona o nível da atividade

            info_atividade.appendChild(avaliacao); // Adiciona o 'div' de avaliação
            avaliacao.appendChild(estrela); // Adiciona uma estrela na avaliação

            info_atividade.appendChild(salvar); // Adiciona o 'div' de salvar
            salvar.appendChild(botao_salvar); // Adiciona o botão de salvar
            salvar.appendChild(botao_ver_descricao); // Adiciona o botão de ver descrição

            // Monta a estrutura do 'div' da caixa da atividade
            caixa_atividade.appendChild(img); // Adiciona a imagem da atividade
            caixa_atividade.appendChild(info_atividade); // Adiciona as informações da atividade

            // Adiciona a atividade à lista de atividades no DOM
            lista_atividades.appendChild(caixa_atividade);

            // ----------------- VER DESCRIÇÃO DA ATIVIDADE ---------------------

            // Adiciona um evento de clique ao botão de ver descrição
            botao_ver_descricao.addEventListener('click', () => {
                // Armazena o ID da atividade no localStorage
                localStorage.setItem('atividade_id', atividade.id);

                // Redireciona para a página de descrição
                window.location.href = '../descrição/descricao.html';
            });

            // ------------------- SALVAR ATIVIDADE ------------------------

            // Adiciona um evento de clique ao botão de salvar para enviar a atividade ao backend
            botao_salvar.addEventListener('click', async () => {
                const atividadeId = atividade.id; // Obtém o ID da atividade
                const usuario_logado = JSON.parse(localStorage.getItem('usuario')); // Converte o JSON em um objeto
                const usuarioId = usuario_logado.id; // Obtém o ID do usuário logado                
                console.log(usuarioId)
            
                // Cria um objeto com os dados da atividade e do usuário
                let data = {
                    atividade_id: atividadeId,
                    usuario_id: usuarioId
                };
            
                // Faz uma requisição POST para salvar a atividade
                const response = await fetch('http://localhost:3001/api/salvar/atividade', {
                    method: 'POST',
                    headers: { 'Content-type': 'application/json;charset=UTF-8' }, // Define o tipo de conteúdo como JSON
                    body: JSON.stringify(data) // Converte os dados para JSON e os envia no corpo da requisição
                });
            
                let content = await response.json(); // Converte a resposta para JSON
            
                if (content.success) {
                    alert('Atividade salva com sucesso!'); // Mostra uma mensagem de sucesso ao usuário
                    location.reload(); // Recarrega a página para atualizar a lista de atividades
                } else {
                    alert('Erro ao salvar atividade!'); // Mostra uma mensagem de erro ao usuário
                }
            });
        });
    } else {
        console.log('erro', result.sql); // Exibe um erro no console se a requisição falhar
    }
});
