// Seleção dos elementos do menu
const menuHamburger = document.querySelector(".menu-icon");
const menuNavigation = document.querySelector(".menu-items ul");

// Função para abrir o menu
function abrirMenu() {
    menuNavigation.classList.toggle("open");
    menuHamburger.classList.toggle("icon-close")
}
menuHamburger.addEventListener("click", abrirMenu);