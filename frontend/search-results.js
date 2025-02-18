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
            linkViewRecipe.href = `recipes-details.html?id=${recipe.id}`;

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