document.addEventListener("DOMContentLoaded", function () {
    const userMenu = document.getElementById("user-menu");
    const loginMenu = document.getElementById("login-menu");
    const userName = document.getElementById("user-name");
    const logoutButton = document.getElementById("logout");

    // Verifica se o usuário está logado
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (usuario) {
        userMenu.style.display = "block"; // Mostra a aba do usuário
        loginMenu.style.display = "none"; // Esconde o botão de login
        userName.textContent = usuario.nome;
    }

    // Logout do usuário
    logoutButton.addEventListener("click", function () {
        localStorage.removeItem("usuario"); // Remove o usuário do LocalStorage
        window.location.href = "index.html"; // Redireciona para a página principal
    });
});
let slideIndex = 0;
mostrarSlides();

function mostrarSlides() {
    let slides = document.getElementsByClassName("banner-slide");

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }

    slides[slideIndex - 1].style.display = "block";
    setTimeout(mostrarSlides, 10000); // Troca a cada 5 segundos
}

// Função para mudar os slides manualmente
function mudarSlide(n) {
    slideIndex += n - 1;
    mostrarSlides();
}
