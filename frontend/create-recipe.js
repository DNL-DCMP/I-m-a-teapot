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

    // Corregir obtención de valores para inputs múltiples
    const ingredients = Array.from(document.querySelectorAll('.recipe-ingredients')).map(input => input.value);
    const instructions = Array.from(document.querySelectorAll('.recipe-instructions')).map(input => input.value);
    const categories = Array.from(document.querySelectorAll('.recipe-categories')).map(input => input.value);

    let body = {
        name: name,
        description: description,
        ingredients: ingredients,
        instructions: instructions,
        // Faltaría implementar el manejo de la imagen si es necesario
        // image: image,
        categories: categories
    };

    fetch("http://127.0.0.1:3000/api/v1/recipes", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Corregir typo en 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(response => {
        if (response.status !== 201) {
            alert("Error al cargar la receta");
        } else {
            clearForm();
        }
    })
    .catch(error => {
        console.error("Error al enviar la receta:", error);
    });
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