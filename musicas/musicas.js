document.addEventListener('DOMContentLoaded', async () => {
    const listaMusicas = document.getElementById('lista_musicas');
    const formularioMusica = document.getElementById('formulario_musica');
    const botaoPublicarMusica = document.getElementById('botao_publicar_musica');
    const botaoCancelarMusica = document.getElementById('cancelar_postar_msc');

    // Função para carregar músicas do backend
    async function carregarMusicas() {
        const response = await fetch('http://localhost:3001/api/get/musica');
        const result = await response.json();

        if (result.success) {
            result.data.forEach(musica => {
                const musicaDiv = document.createElement('div');
                musicaDiv.classList.add('sugestao_musica');

                const imgDiv = document.createElement('div');
                imgDiv.classList.add('img_musica');

                const img = document.createElement('img');
                img.src = '../imagens/musica_foto.jpg';
                img.classList.add('imagem_musica');
                img.alt = 'músicas';
                imgDiv.appendChild(img);

                const descricaoDiv = document.createElement('div');
                descricaoDiv.classList.add('descricao_msc');

                const tituloMusica = document.createElement('p');
                tituloMusica.textContent = `${musica.nome} - ${musica.artista}`;
                
                // Audio player
                const audioPlayer = document.createElement('audio');
                audioPlayer.controls = true;
                audioPlayer.src = `../uploads/musicas/${musica.arquivo}`;

                descricaoDiv.appendChild(tituloMusica);
                descricaoDiv.appendChild(audioPlayer);

                musicaDiv.appendChild(imgDiv);
                musicaDiv.appendChild(descricaoDiv);

                listaMusicas.appendChild(musicaDiv);
            });
        } else {
            console.error('Erro ao carregar músicas:', result.message);
        }
    }

    // Mostrar o formulário de postagem ao clicar no botão "Postar música"
    botaoPublicarMusica.addEventListener('click', () => {
        formularioMusica.style.display = 'block';
    });

    // Ocultar o formulário ao clicar no botão "Cancelar"
    botaoCancelarMusica.addEventListener('click', () => {
        formularioMusica.style.display = 'none';
    });

    // Envia uma nova música para o backend
    document.getElementById('botao_postar_msc').addEventListener('click', async () => {
        const formData = new FormData(formularioMusica);

        const response = await fetch('http://localhost:3001/api/postar/musica', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        if (result.success) {
            alert('Música enviada com sucesso!');
            formularioMusica.reset();
            formularioMusica.style.display = 'none';
            listaMusicas.innerHTML = '';
            carregarMusicas();
        } else {
            alert('Erro ao enviar música!');
        }
    });

    // Carrega as músicas ao iniciar
    carregarMusicas();
});
