document.addEventListener('DOMContentLoaded', async () => {
    const listaMusicas = document.getElementById('lista_musicas');
    const formularioMusica = document.getElementById('formulario_musica');
    const botaoPublicarMusica = document.getElementById('botao_publicar_musica');
    const botaoCancelarMusica = document.getElementById('cancelar_postar_msc');
    const secaoPostarMusica = document.getElementById('postar_musica')

    // Verificar tipo de usuário (admin ou não)
    const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));
    
    // Se o usuário não for administrador, esconde a opção de postar música
    if (usuarioLogado.tipo_usuario !== 'admin') {
        secaoPostarMusica.style.display = 'none'; // Oculta o botão de "Postar música"
    }

    // Function to load music from the backend
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

                // Create and append title element above the audio player
                const tituloMusica = document.createElement('p');
                tituloMusica.textContent = `${musica.nome} - ${musica.artista}`;
                tituloMusica.classList.add('titulo_musica'); // Optional for styling
                
                // Audio player
                const audioPlayer = document.createElement('audio');
                audioPlayer.controls = true;
                audioPlayer.src = `../back/src/uploads/musicas/${musica.arquivo}`;

                // Append title and audio player to description div
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

    // Show post form on "Post Music" button click
    botaoPublicarMusica.addEventListener('click', () => {
        formularioMusica.style.display = 'block';
    });

    // Hide form on "Cancel" button click
    botaoCancelarMusica.addEventListener('click', () => {
        formularioMusica.style.display = 'none';
    });

    const postarMusica = document.getElementById('botao_postar_msc')
    
    postarMusica.addEventListener('click', async () => {
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

    carregarMusicas();
});
