const moreIngredientesBtn = document.querySelector(".more-ingredients-btn");
const moreInstructionsBtn = document.querySelector(".more-instructions-btn");
const moreCategoriesBtn = document.querySelector(".more-categories-btn");

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

moreCategoriesBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const categoriesContainer = document.querySelector(".categories")

    const inputCategories = document.createElement('input');
    inputCategories.type = "text";
    inputCategories.name = "recipecategories";
    inputCategories.classList.add('recipe-categories');

    categoriesContainer.appendChild(inputCategories);
});


document.addEventListener('DOMContentLoaded', () => {
    const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
        const [key, value] = cookie.split("=");
        acc[key] = value;
        return acc;
    }, {});

    const recipeId = cookies.recipeid;
    if (recipeId) {
        loadRecipeForEditing(recipeId);
    }

    function loadRecipeForEditing(id){
        fetch(`${window.API_URL}/api/v1/recipes/${id}`)
        .then(response => response.json())
        .then(recipe => {
        
            const name = document.querySelector('.recipe-name');
            const description = document.querySelector('.recipe-description');
            const time = document.querySelector('.recipe-time');
            const temperature = document.querySelector('.recipe-temperatureCook');
            const picture = document.querySelector('.recipe-picture');

            name.value = recipe.name;
            description.value = recipe.description;
            time.value = recipe.time;
            temperature.value = recipe.temperatureCook;
            if(recipe.recipePicture){
                picture.value = recipe.recipePicture;
            }


            recipe.ingredients.forEach((ingredient, index) => {
                if(index === 0){
                    document.querySelector('.recipe-ingredients').value = ingredient;
                } else {
                    addInputField('.ingredients', 'recipe-ingredients', ingredient);
                }
            });

            recipe.instructions.forEach((instruction, index) => {
                if(index === 0){
                    document.querySelector('.recipe-instructions').value = instruction;
                } else {
                    addInputField('.instructions', 'recipe-instructions', instruction);
                }
            });

            recipe.categories.forEach((category, index) => {
                if (index === 0){
                    document.querySelector('.recipe-categories').value = category;
                } else {
                    addInputField('.category', 'recipe-categories',category);
                }
            })

            const submitUserBtn = document.querySelector('#saveButton');
            submitUserBtn.onclick = () => updateRecipe(id);

            window.editingRecipeId = recipe.id;
        })
        .catch(error => console.error("Error al cargar la receta:", error));
    }

    function addInputField(containerSelector, inputClass, value){
        const container = document.querySelector(containerSelector);
        
        const input = document.createElement('input');
        input.type = "text";
        input.name = inputClass;
        input.classList.add(inputClass);
        input.value = value;
        container.appendChild(input);
    }


    function updateRecipe(id) {

        let name = document.querySelector('.recipe-name').value;
        let description = document.querySelector('.recipe-description').value;
        let time = parseInt(document.querySelector('.recipe-time').value);
        let temperatureCook = parseInt(document.querySelector('.recipe-temperatureCook').value);
        let recipePicture = document.querySelector('.recipe-picture').value;
        
        let ingredients = Array.from(document.querySelectorAll('.recipe-ingredients')).map(input => input.value);
        let instructions = Array.from(document.querySelectorAll('.recipe-instructions')).map(input => input.value);
        let categories = Array.from(document.querySelectorAll('.recipe-categories')).map(input => input.value);

        // Verifica que se completen todos los campos obligatorios
        if(!name || !description || isNaN(time) || isNaN(temperatureCook) || ingredients.length === 0 || instructions.length === 0){
            alert("Por favor, completa todos los campos obligatorios");
            return;
        }

        let body = {
            name: name,
            description: description,
            time: time,
            temperatureCook: temperatureCook,
            recipePicture: recipePicture,
            ingredients: ingredients,
            instructions: instructions,
            categoryNames: categories,
        };

        fetch(`${window.API_URL}/api/v1/recipes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(response => {
            if (response.status !== 200) {
                alert("Error al actualizar la receta");
            } else {
                console.log("Receta actualizada");
                window.location.href = `recipes-details.html`;
            }
        })
        .catch(error => console.error("Error al actualizar la receta:", error));
    }
})