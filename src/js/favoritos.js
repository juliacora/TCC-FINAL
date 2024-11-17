document.addEventListener('DOMContentLoaded', function () {
    const favoritesContainer = document.getElementById("favorites-container");

    async function fetchFavorites() {
        let idUsuario = JSON.parse(localStorage.getItem("usuarioLogado")); 
        let idUser = idUsuario.id;

        // let data = {"id_usuario": idUser}

        const response = await fetch(`http://localhost:3000/api/favorite/list/${idUser}`, {
            method: "GET",
            headers: {"Content-type": "application/json;charset=UTF-8"},
            // body: data
        });

        const content = await response.json();
        console.log(content);

        if (content.success) {
            displayFavorites(content.data);
        } else {
            alert(content.message);
        }
    }

    async function desfavoritarNoticia(link) {
        console.log(link)

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
            // FAZER RELOAD
            
        } catch (error) {
            console.error("Erro ao desfavoritar a notícia:", error);
            alert("Erro ao desfavoritar a notícia.");
        }

        // FAZER RELOAD
        
    }


    function displayFavorites(newsData) {
 
        let cardsContainer = document.querySelector("#cards");
        cardsContainer.innerHTML = '';


        newsData.forEach((news) => {
            console.log(news)

            let card = document.createElement("div");
            card.setAttribute("id", "card");
            
            // Define uma imagem padrão caso 'urlToImage' esteja ausente
            const imageUrl = news.urlToImage || '../src/images/imagemPadrao.png';


            card.innerHTML = `
                <div class="card-imagem">
                    <span class="line-horizontal"></span>
                    <img onclick="favoritarNoticia('${news.titulo}', '${news.link}', '${news.autor}', '${news.imagem_url}')" src="${news.imagem_url}" alt="Imagem da notícia">
                </div>
                <div class="card-text">
                    <div class="card-text-group">
                        <h4 class="card-text-font">${news.autor}</h4>
                        <img id="favoritar" class="favoritar" src="../src/images/marca-paginas.png" alt="" onclick="desfavoritarNoticia('${news.link}')">
                    </div>
                    <a href="${news.link}" target="_blank"><h3>${news.titulo}</h3></a>
                </div>
            `;
            cardsContainer.appendChild(card);
        });


 
 
 
        // favoritesContainer = document.getElementById("cards");

        // favoritesContainer.innerHTML = ''; // Limpa o contêiner antes de adicionar novos cards

        // favorites.forEach(favorite => {
        //     let card = document.createElement("div");
        //     card.setAttribute("id", "card");
        //     card.classList.add("card"); // Adicione uma classe para estilização, se necessário

        //     let titulo = document.createElement("h1");
        //     let link = document.createElement("a");
        //     let favorito = document.createElement("p");

        //     titulo.textContent = favorite.titulo;
        //     link.setAttribute("href", favorite.link);
        //     link.setAttribute("target", "_blank");
        //     link.textContent = "Leia mais";
        //     favorito.textContent = "Favoritado";

        //     card.appendChild(titulo);
        //     card.appendChild(link);
        //     card.appendChild(favorito);
        //     favoritesContainer.appendChild(card);
        // });
    }



    


    fetchFavorites();
});