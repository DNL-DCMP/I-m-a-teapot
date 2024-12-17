
const nav = document.querySelector(".nav");
const searchIcon = document.querySelector("#searchIcon");
const navOpenBtn = document.querySelector(".navOpenBtn");
const navCloseBtn = document.querySelector(".navCloseBtn");


/*Agrega funcionalidad al boton de busqueda */
searchIcon.addEventListener('click', () => {
    nav.classList.toggle('openSearch');
    nav.classList.remove('openNav');

    if(nav.classList.contains('openSearch')){
       return searchIcon.classList.replace("bx-search", "bx-x");
    }

    searchIcon.classList.replace("bx-x", "bx-search");
});

/*Agrega funcionalidad al boto de menu y cierre*/
navOpenBtn.addEventListener('click', () => {
    nav.classList.add('openNav');
    nav.classList.remove('openSearch');
    searchIcon.classList.replace("bx-x", "bx-search");
});

navCloseBtn.addEventListener('click', () => {
    nav.classList.remove('openNav');
});




/* Autentication */
document.addEventListener("DOMContentLoaded", () => {
    // Obtener el usuario desde localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    // Verificar si el usuario existe y si está logueado
    if (user && user.isLoggedIn) {
        console.log("El usuario está logueado:", user.isLoggedIn);

        const authButtons = document.querySelectorAll(".auth");
        authButtons.forEach(button => button.classList.add("hidden"));
        
    } else {
        console.log("El usuario no está logueado o no existe.");
        const notAuthButtons = document.querySelectorAll(".notAuth");
        notAuthButtons.forEach(button => button.classList.add("hidden") )
    }
});