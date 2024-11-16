document.addEventListener('DOMContentLoaded', async () => {
    const usuario_logado = JSON.parse(localStorage.getItem('usuario'));
    const id_usuario = usuario_logado.id;
    console.log(usuario_logado)

    const response = await fetch(`http://localhost:3001/api/atividade/salva/${id_usuario}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    const result = await response.json();

    if (result.success) {
        const atividadesContainer = document.getElementById('atividadesSalvas');
        atividadesContainer.innerHTML = '';

        result.data.forEach(atividade => {
            console.log(atividade); // Verifique o objeto retornado pelo back-end para confirmar se 'id' está presente
        
            const card = document.createElement('div');
            card.classList.add('card');
        
            card.innerHTML = `
                <div class="caixa_atividade">
                    <img src="../back/src/uploads/${atividade.imagem}" alt="${atividade.nome}" class="foto_atividade">
                    <div class="info_atividade">
                        <div class="texto_atividade">
                            <h3 class="topico_info">${atividade.nome}</h3>
                            <p class="topico_info">Nível: ${atividade.nivel}</p>
                            <p class="topico_info">Tipo: ${atividade.tipo_atividade}</p>
                        </div>

                        <div class="excluir_atividade">
                            <button class="botao_excluir" data-atividade-id="${atividade.id}">Excluir</button>
                        </div>
                    </div>
                </div>
            `;
        
            atividadesContainer.appendChild(card);

        });

        // Listener para os botões de exclusão
        document.querySelectorAll('.botao_excluir').forEach(botao => {
            botao.addEventListener('click', async () => {
                const atividadeId = botao.dataset.atividadeId;
                console.log(atividadeId)

                // Requisição DELETE para excluir a atividade salva
                const deleteResponse = await fetch(`http://localhost:3001/api/atividade/salva/${id_usuario}/${atividadeId}`, {
                    method: 'DELETE'
                });

                const deleteResult = await deleteResponse.json();

                if (deleteResult.success) {
                    alert('Atividade excluída com sucesso!');
                    botao.closest('.card').remove(); // Remove o card do DOM
                } else {
                    alert('Erro ao excluir atividade: ' + deleteResult.message);
                }
            });
        });
    } else {
        console.error(result.message);
    }
});
