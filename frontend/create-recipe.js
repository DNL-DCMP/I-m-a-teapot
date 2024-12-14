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


const moreIngredientesBtn = document.querySelector(".more-ingredients-btn");
const moreInstructionsBtn = document.querySelector(".more-instructions-btn");
const addCategoryBtn = document.querySelector(".add-category-btn");

moreIngredientesBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const ingredientsContainer = document.querySelector(".ingredients");

    const inputIngredients = document.createElement('input');
    inputIngredients.type = "text";
    inputIngredients.name = "recipeingredientes";
    inputIngredients.classList.add('recipe-ingredients')

    ingredientsContainer.appendChild(inputIngredients);
});

moreInstructionsBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const instructionsContainer = document.querySelector(".instructions")

    const inputInstructions = document.createElement('input');
    inputInstructions.type = "text";
    inputInstructions.name = "recipeinstructions";
    inputInstructions.classList.add('recipe-instructions');

    instructionsContainer.appendChild(inputInstructions);
});

addCategoryBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const categoriesContainer = document.querySelector(".categories")

    const inputCategories = document.createElement('input');
    inputCategories.type = "text";
    inputCategories.name = "recipecategories";
    inputCategories.classList.add('recipe-categories');

    categoriesContainer.appendChild(inputCategories);
});

function createRecipe() {
    const name = document.querySelector('.recipe-name').value;
    const description = document.querySelector('.recipe-description').value;
    const ingredients = document.querySelectorAll('.recipe-ingredients').values;
    const instructions = document.querySelectorAll('.recipe-instructions').values;
    const categories = document.querySelectorAll('.recipe-categories').values;

    let body = {
        name: name,
        description: description,
        ingredients: ingredients, 
        instructions: instructions,
        /*Falta agregar el input en el front*/
        image: image,
        categories: categories
    };

    fetch("http://127.0.0.1:3000/api/v1/recipes", {
        method: 'POST',
        headers: {
            'Content-Type': 'aplication/json'
        },

        body: JSON.stringify(body)
    })
        .then(response => {
            if(response.status !== 201){
                alert("Error al cargar la receta");
            } else {
                clearForm();
            }
        })

}

function clearForm() {
    document.querySelector('.recipe-name').value = ' ';
    document.querySelector('.recipe-description').value = ' ';
    
    const ingredientsInputs = document.querySelectorAll('.recipe-ingredients');
        ingredientsInputs.forEach(input => {
            input.value = '';
        });

    const instructionsInputs = document.querySelectorAll('.recipe-instructions');
        instructionsInputs.forEach(input => {
            input.value = '';
        });

    const categoriesInputs = document.querySelectorAll('.recipe-categories');
        categoriesInputs.forEach(input => {
            input.value = '';
        });
}