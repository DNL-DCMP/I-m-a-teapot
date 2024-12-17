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
        const recipeInfo = document.querySelector('.recip-info');
        const recipeLeft = document.querySelector('.recipe-left');

        let recipeName = document.createElement('h1');
        recipeName.classList.add('recipe-name');
        recipeName.innerText = recipe.name;
        recipeInfo.appendChild(recipeName);

        let recipeDescription = document.createElement('div');
        recipeDescription.classList.add('recipe-description');

            let description = document.createElement('p');
            description.classList.add('description');
            description.innerText = recipe.description;
            recipeDescription.appendChild(description);
        
        recipeInfo.appendChild(recipeDescription);
        

        let instructions = document.querySelector('.intructions');

        recipe.instructions.forEach(instruction => {
            let li = document.createElement('li');
            li.classList.add('instructions-item');
            li.innerText = instruction;
            instructions.appendChild(li);
        });

        let img = document.createElement('img');
        img.src = recipe.image;
        img.classList.add("image-recipe");
        recipeLeft.appendChild(img);

        let RecipeIngredients = document.createElement('div');
        RecipeIngredients.classList.add('recipe-ingredients');

        const recipeIngredients = document.querySelector('.ingredients');

        recipe.ingredients.forEach(ingredient => {
            let listElement = document.createElement('li');
            listElement.classList.add('ingredients-item');
            listElement.innerText = recipe.ingredients;
            RecipeIngredients.appendChild(listElement);
        })
    })