// Adiciona um listener para o evento 'DOMContentLoaded', que será executado quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', async () => {
    // Recupera o objeto 'usuario' armazenado no localStorage e o converte de JSON para um objeto JavaScript
    const usuario_logado = JSON.parse(localStorage.getItem('usuario'));
    // Obtém o ID do usuário logado a partir do objeto
    const id_usuario = usuario_logado.id;

    // Faz uma requisição GET ao backend para obter as atividades salvas do usuário logado
    const response = await fetch(`http://localhost:3001/api/atividade/salva/${id_usuario}`, {
        method: 'GET', // Define o método HTTP como GET
        headers: { 'Content-Type': 'application/json' } // Define o cabeçalho da requisição como JSON
    });

    // Converte a resposta do servidor para JSON
    const result = await response.json();

    // Verifica se a requisição foi bem-sucedida
    if (result.success) {
        // Seleciona o elemento que conterá as atividades salvas pelo ID
        const atividadesContainer = document.getElementById('atividadesSalvas');
        atividadesContainer.innerHTML = ''; // Limpa o conteúdo do container antes de adicionar as novas atividades

        // Itera sobre cada atividade recebida do servidor
        result.data.forEach(atividade => {
            // Cria um novo 'div' para representar um cartão de atividade
            const card = document.createElement('div');
            card.classList.add('card'); // Adiciona a classe 'card' para estilização

            // Define o conteúdo HTML do cartão de atividade, incluindo imagem, nome e nível
            card.innerHTML = `
                <div class="caixa_atividade">
                    <img src="../back/src/uploads/${atividade.imagem}" alt="${atividade.nome}" class="foto_atividade">
                    <div class="info_atividade">
                        <h2>${atividade.nome}</h2>
                        <p>Nível: ${atividade.nivel}</p>
                    </div>
                </div>                
                <div class="card-info">

                </div>
            `;

            // Adiciona o cartão de atividade ao container de atividades salvas no DOM
            atividadesContainer.appendChild(card);
        });
    } else {
        // Se a requisição não foi bem-sucedida, exibe a mensagem de erro no console
        console.error(result.message);
    }
});
