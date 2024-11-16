// descricao.js

document.addEventListener('DOMContentLoaded', async () => {
    const atividadeId = localStorage.getItem('atividade_id');
    console.log(atividadeId)

    if (!atividadeId) {
        console.error('ID da atividade não foi encontrado');
        return;
    }

    const response = await fetch(`http://localhost:3001/api/descricao/atividade/${atividadeId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        const result = await response.json();

        if (result.success) {
            document.getElementById('titulo').textContent = result.data.nome;
            document.getElementById('texto_descricao').textContent = result.data.descricao || "Sem descrição disponível.";

            // Set the smaller image size and display it
            const imageUrl = `../back/src/uploads/${result.data.imagem}`;
            const imagemElement = document.getElementById('imagem_atividade');
            imagemElement.src = imageUrl;
            imagemElement.alt = result.data.nome;
        } else {
            console.error(result.message || 'Erro ao buscar dados da atividade');
        }
    } else {
        console.error(`Erro na requisição: ${response.status} ${response.statusText}`);
    }
});