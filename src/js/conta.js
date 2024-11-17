document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.querySelector('.menu-icon');
    const menuItems = document.querySelector('.menu-items');

    menuIcon.addEventListener('click', function () {
        if (menuItems.style.display === 'flex') {
            menuItems.style.display = 'none';
        } else {
            menuItems.style.display = 'flex';
        }
    });


    
    const nomeJson = localStorage.getItem('usuarioLogado');
    const infos_usuario = JSON.parse(nomeJson);
    
    console.log(infos_usuario)
    
    const nome_conta = document.getElementById("nome_conta");
    const email_conta = document.getElementById("email_conta");
    // const favoritos = document.getElementById("favoritos")
    
    
    nome_conta.innerText += infos_usuario.nome;
    email_conta.innerText += infos_usuario.email;
    // favoritos.innerText += infos_usuario.favoritos;



});

