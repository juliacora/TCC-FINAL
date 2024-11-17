// Seleção do botão play/pause, do botão de volume e do slider
const audioButton = document.querySelector("#volume-button");
const playButton = document.querySelector("#play-button");
const slider = document.querySelector(".slider");
const newsTitle = document.querySelector("#news-title");

let isTurned = false; // Para controlar a leitura
// ALTERADO (false)

let isMuted = false;  // Para controlar o estado de mute
let currentNewsIndex = 0;
// let newsData = [];
let playTitleNews = [];
let currentVolume = 1; // Volume padrão (1.0 é o máximo)
let previousSliderValue = parseInt(slider.value); // Armazena o valor anterior do slider
let idTotal = 0

// Inicializa a leitura das notícias ao carregar a página
getNews();

function marcarFavorito(id, link, titulo, autor, imagem_url) {

    favoritarNoticia(link, titulo, autor,  imagem_url)
    
    // Seleciona todos os elementos com a classe 'favoritar'
    const imagensFavorito = document.querySelectorAll(".favoritar");

    // Seleciona o elemento específico pelo índice (id - 1)
    const imagemOriginal = imagensFavorito[id - 1];

    // Define os caminhos das imagens de "favoritado" e "não favoritado"
    const imagemFavoritado = './src/images/marca-paginas.png';
    const imagemNaoFavoritado = './src/images/save-instagram.png';

    // Verifica se o elemento existe para evitar erros
    if (imagemOriginal) {
        // Alterna a imagem com base no src atual
        const srcAtual = imagemOriginal.getAttribute('src');
        imagemOriginal.setAttribute('src', srcAtual === imagemFavoritado ? imagemNaoFavoritado : imagemFavoritado);
    }

    // console.log(link, titulo)
    
}

async function favoritarNoticia(link, titulo, autor, imagem_url) {
    let idUsuario = JSON.parse(localStorage.getItem("usuarioLogado")).id;
    let data = { idUsuario, titulo, link, autor, imagem_url };

    console.log(data);

    try {
        const response = await fetch('http://localhost:3000/api/store/favorite', {
            method: "POST",
            headers: { "Content-type": "application/json;charset=UTF-8" },
            body: JSON.stringify(data)
        });

        let content = await response.json();
        alert(content.success ? "Favoritado com sucesso" : content.message);

    } catch (error) {
        console.error("Erro ao favoritar a notícia:", error);
        alert("Erro ao favoritar a notícia.");
    }
}

async function verFavoritos(){
    let idUsuario = JSON.parse(localStorage.getItem("usuarioLogado")); 
    let idUser = idUsuario.id
    let data = idUser

    const response = await fetch('http://localhost:3000/api/favorite/list', {
        method: "GET",
        headers: {"Content-type": "application/json;charset=UTF-8"},
        body: JSON.stringify(data)
    });

    if(content.success) {
        alert("Favoritado com sucesso")
     } else {
         alert(content.message);
     }
}

function marcarFavorito(id, link, titulo, autor,  imagem_url) {
    const imagensFavorito = document.querySelectorAll(".favoritar");
    const imagemOriginal = imagensFavorito[id - 1];
    const imagemFavoritado = './src/images/marca-paginas.png';
    const imagemNaoFavoritado = './src/images/save-instagram.png';

    if (imagemOriginal) {
        const srcAtual = imagemOriginal.getAttribute('src');

        if (srcAtual === imagemFavoritado) {
            // Se já está favoritado, desfavorita
            desfavoritarNoticia(link);
            imagemOriginal.setAttribute('src', imagemNaoFavoritado);
        } else {
            // Se não está favoritado, favorita
            favoritarNoticia(link, titulo, autor,  imagem_url);
            imagemOriginal.setAttribute('src', imagemFavoritado);
        }
    }
}

async function desfavoritarNoticia(link) {
    let idUsuario = JSON.parse(localStorage.getItem("usuarioLogado")).id;
    let data = { idUsuario, link };

    try {
        const response = await fetch('http://localhost:3000/api/favorite/delete', {
            method: "DELETE",
            headers: { "Content-type": "application/json;charset=UTF-8" },
            body: JSON.stringify(data)
        });

        let content = await response.json();
        alert(content.success ? "Notícia desfavoritada com sucesso" : content.message);

    } catch (error) {
        console.error("Erro ao desfavoritar a notícia:", error);
        alert("Erro ao desfavoritar a notícia.");
    }
}


// TESTAR
// async function favoritarNoticia(link, titulo){
//     let idUsuario = JSON.parse(localStorage.getItem("usuarioLogado")); 
//     let idUser = idUsuario.id
//     console.log(idUser);
    
//     let data = {idUser, titulo, link}
 
//     const response = await fetch('http://localhost:3000/api/store/favorite', {
//         method: "POST",
//         headers: {"Content-type": "application/json;charset=UTF-8"},
//         body: JSON.stringify(data)
//     });
 
//     let content = await response.json();
 
//     console.log(content);
 
//     if(content.success) {  



//     } else {
//         alert(content.message);
//     }
// }

async function getNews() {
    const url = 'https://newsapi.org/v2/everything?language=pt&q=pol%C3%ADtica+AND+brasileira&sortBy=publishedAt&apiKey=c9795c2164cd4a20b71dab2133967a63';

    try {
        const response = await fetch(url);
        const data = await response.json();
        // Filtra as notícias para garantir que todas tenham título e imagem
        const newsData = data.articles
            .filter(news => news.title && news.url && news.urlToImage) // verifica campos obrigatórios
            .slice(0, 10); // limita a 10 notícias

        // Limpa o container e exibe as notícias na interface
        let cardsContainer = document.querySelector("#cards");
        cardsContainer.innerHTML = '';

        

        newsData.forEach((news) => {

            playTitleNews.push(news.title) // ver

            let card = document.createElement("div");
            card.setAttribute("id", "card");
            
            idTotal++;

            // Define uma imagem padrão caso 'urlToImage' esteja ausente
            const imageUrl = news.urlToImage || './src/images/imagemPadrao.png';

            card.innerHTML = `
                <div class="card-imagem">
                    <span class="line-horizontal"></span>
                    <img onclick="favoritarNoticia('${news.title}', '${news.url}', '${news.source.name}', '${imageUrl}')" src="${imageUrl}" alt="Imagem da notícia">
                </div>
                <div class="card-text">
                    <div class="card-text-group">
                        <h4 class="card-text-font">${news.source.name}</h4>
                        <img id="favoritar" class="favoritar" src="./src/images/save-instagram.png" alt="" onclick="marcarFavorito(${idTotal},'${news.url}','${news.title}', '${news.source.name}', '${imageUrl}')">
                    </div>
                    <a href="${news.url}" target="_blank"><h3>${news.title}</h3></a>
                </div>
            `;
            cardsContainer.appendChild(card);
        });

        // Inicia a leitura das notícias se ativada
        if (isTurned) {
            speakNews();
        }

    } catch (error) {
        console.error("Erro ao buscar as notícias:", error);
    }
}
console.log(playTitleNews)
console.log(currentNewsIndex)
// Função para controlar a leitura das notícias
function speakNews() {
    if (currentNewsIndex < playTitleNews.length) { //FOI TROCADO O newsData pelo playTitleNews
        

        const synth = window.speechSynthesis;
        const utter = new SpeechSynthesisUtterance(playTitleNews[currentNewsIndex]);

        // Seleciona a primeira voz disponível (opcional)
        const voices = synth.getVoices();
        utter.voice = voices[0];

        // Define o volume da utterance
        utter.volume = isMuted ? 0 : currentVolume; // Se mutado, volume 0; caso contrário, volume atual

        // Lê o título atual e vai para o próximo ao terminar
        utter.onend = () => {
            currentNewsIndex++;
            if (isTurned && currentNewsIndex < playTitleNews.length) { //FOI TROCADO O newsData pelo playTitleNews
                speakNews();  // Chama a próxima notícia na sequência
            }
        };

        // Reproduz o áudio
        console.log("entrou aqui")
        synth.speak(utter);
    }
}

// Evento de clique para alternar play/pause
playButton.addEventListener('click', function () {
    const synth = window.speechSynthesis;
    isTurned = !isTurned;

    if (isTurned) {
        playButton.style.paddingLeft = '0.1rem';
        playButton.innerHTML = '<img src="./src/images/pause.webp" alt="Pause">';
        if (!synth.speaking) {
            speakNews();  // Inicia a leitura
        } else {
            synth.resume();  // Retoma a leitura atual
        }
    } else {
        playButton.style.paddingLeft = '0.3rem';
        playButton.innerHTML = '<img src="./src/images/play.webp" alt="Play">';
        synth.pause();  // Pausa a leitura
    }
});

// Evento de clique para mutar/desmutar
audioButton.addEventListener('click', function () {
    const synth = window.speechSynthesis;
    isMuted = !isMuted; // Alterna entre mutar e desmutar

    // Atualiza o ícone do botão de volume
    audioButton.setAttribute("src", isMuted ? './src/images/volume-mudo.png' : './src/images/volume.png');

    // Ajusta o volume do utterance atual, se estiver em reprodução
    if (synth.speaking) {
        synth.cancel();  // Cancela a leitura atual para evitar sobreposição
        speakNews();     // Reinicia a leitura da notícia atual com o novo volume
    }
});

// Função para atualizar o título da notícia e posição do balãozinho
function updateNewsTitle() {
    newsTitle.textContent = `Notícia ${parseInt(slider.value) + 1}`;
    updateTooltipPosition();  // Atualiza a posição do balão junto com o texto
}

// Função para posicionar o balãozinho sobre o botão do slider

if(window.matchMedia("(max-width: 768px)").matches){
    newsTitle.style.left = '-15.5%'
}
let offset = newsTitle.style.left;

offset = Number(offset.slice(0, -1))

function updateTooltipPosition() {
    const currentSliderValue = parseInt(slider.value);
    
    // Verifica a direção do movimento e ajusta o `offset` em consequência
    if (currentSliderValue > previousSliderValue) {
        offset += 11;  // Movimenta para frente 11;  // Movimenta para frente
    } else if (currentSliderValue < previousSliderValue) {
        offset -= 11;  // Movimenta para trás
    }
    
    // Atualiza a posição do título
    newsTitle.style.left = `${offset}%`;
    // Atualiza o valor anterior para o próximo movimento
    previousSliderValue = currentSliderValue;
}

// Evento de input para atualizar título e posição do balãozinho conforme o slider é movido
slider.addEventListener("input", function () {
    currentNewsIndex = parseInt(slider.value);
    updateNewsTitle();
});

// Função para favoritar notícia

