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
    const titleContainer = document.querySelector('.encabezado');
    const resultsContainer = document.getElementById('results');
    const searchResults = JSON.parse(localStorage.getItem('searchResults')) || [];

    if (searchResults.length === 0) {
        titleContainer.innerHTML = '<h1>No se encontraron recetas para tu búsqueda</h1>';
        return;
    }

     
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

});