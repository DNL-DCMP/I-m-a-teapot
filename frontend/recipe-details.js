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

const recipeContainer = document.querySelector('.container');

const params = new URLSearchParams(window.location.search);
const recipeId = params.get('id');

fetch(`http://localhost:3000/api/v1/recipes/${recipeId}`)
    .then(response => response.json())
    .then(recipe => {

        const recipeLeft = document.querySelector('.recipe-left');
        const recipeRight = document.querySelector('.recipe-right');

        const ingredientsTitle = document.createElement('h1');
        ingredientsTitle.classList.add('ingredients-title');
        ingredientsTitle.innerText = "Ingredientes";
        recipeLeft.appendChild(ingredientsTitle);

        const ingredientsContainer = document.createElement('ul');
        ingredientsContainer.classList.add('ingredients-container');

        for (let i = 0; i < recipe.ingredients.length; i++) {
            let ingredientItem = document.createElement('li');
            ingredientItem.innerText = recipe.ingredients[i];
            ingredientsContainer.appendChild(ingredientItem);
        }
        recipeLeft.appendChild(ingredientsContainer);

        let recipeName = document.createElement('h1');
        recipeName.classList.add('recipe-name');
        recipeName.innerText = recipe.name;
        recipeRight.appendChild(recipeName);

        let recipeDescription = document.createElement('p');
        recipeDescription.classList.add('recipe-description');
        recipeDescription.innerText = recipe.description;
        recipeRight.appendChild(recipeDescription);

        const instructionsTitle = document.createElement('h1');
        instructionsTitle.classList.add('instructions-title');
        instructionsTitle.innerText = "Instrucciones:"
        recipeRight.appendChild(instructionsTitle);

        const instructionsContainer = document.createElement('ul');
        instructionsContainer.classList.add('instructions-container');

        for(let i = 0; i < recipe.instructions.length; i++){
            let instructionsItem = document.createElement('li');
            instructionsItem.innerText = recipe.instructions[i];
            instructionsContainer.appendChild(instructionsItem);
        }

        recipeRight.appendChild(instructionsContainer);
    })