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

document.addEventListener('DOMContentLoaded', () => {
    const resultsContainer = document.getElementById('results')
    const searchResults = JSON.parse(localStorage.getItem('searchResults'))

    if (searchResults && searchResults.length > 0) {
        searchResults.forEach(recipe => {
                let div = document.createElement('div');
                div.classList.add('card-recipe');

                let img = document.createElement('img');
                img.src = recipe.image;

                /* Titulo de la receta */
                let titulo = document.createElement('h3');
                titulo.classList.add('recipe-name');
                titulo.innerText = recipe.name;

                /*Descripcion de la receta */
                let desc = document.createElement('p');
                desc.classList.add('recipe-description');
                desc.innerText = recipe.description;

                /* Boton de ver receta */
                let linkViewRecipe = document.createElement('a');
                linkViewRecipe.classList.add('view-recipe-btn');
                linkViewRecipe.innerText = "Ver receta";
                linkViewRecipe.href = `recipes-details.html?id=${recipe.id}`;

                /*div.appendChild(img);*/
                div.appendChild(titulo);
                div.appendChild(desc);
                div.appendChild(linkViewRecipe);

                resultsContainer.appendChild(div);
        })

    } else {
        resultsContainer.innerHTML = '<p>No se encontraron recetas.</p>'
    }
})