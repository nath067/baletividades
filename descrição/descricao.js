document.addEventListener('DOMContentLoaded', async () => {
    const atividadeId = localStorage.getItem('atividade_id'); 

    if (!atividadeId) {
        console.error('ID da atividade não foi encontrado');
        return;
    }

    try {
        // Usar método GET para obter a atividade
        const response = await fetch(`http://localhost:3001/api/get/atividade/${atividadeId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();

        if (result.success) {
            document.getElementById('titulo').textContent = result.data.nome;
            document.getElementById('texto_descricao').textContent = result.data.descricao;
        } else {
            console.error(result.message || 'Erro ao buscar dados da atividade');
        }

    } catch (error) {
        console.error('Erro ao processar a requisição:', error);
    }
});
