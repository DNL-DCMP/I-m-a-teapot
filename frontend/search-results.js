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

/*Agrega funcionalidad al boton de menu y cierre*/
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


document.addEventListener('DOMContentLoaded', () => {
    const resultsContainer = document.getElementById('results');
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
    }

    function deleteCookie(name) {
        document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }

    const searchResults = JSON.parse(getCookie('searchResults'));

    deleteCookie('searchResults');

    if (searchResults && searchResults.length > 0) {
        searchResults.forEach(recipe => {
            let div = document.createElement('div');
            div.classList.add('card-recipe');

            let img = document.createElement('img');
            img.src = recipe.recipePicture;

            /* Titulo de la receta */
            let titulo = document.createElement('h3');
            titulo.classList.add('recipe-name');
            titulo.innerText = recipe.name;

            /* Descripcion de la receta */
            let desc = document.createElement('p');
            desc.classList.add('recipe-description');
            desc.innerText = recipe.description;

            /* Boton de ver receta */
            let linkViewRecipe = document.createElement('a');
            linkViewRecipe.classList.add('view-recipe-btn');
            linkViewRecipe.innerText = "Ver receta";
            linkViewRecipe.addEventListener(`click`, () => {
                document.cookie = `recipeid=${recipe.id}; path=/; max-age=3600`; // Expira en 1 hora
                window.location.href = 'recipes-details.html';
            });
            div.appendChild(img);
            div.appendChild(titulo);
            div.appendChild(desc);
            div.appendChild(linkViewRecipe);

            resultsContainer.appendChild(div);
        });
    } else {
        resultsContainer.innerHTML = '<p>No se encontraron recetas.</p>';
    }
});