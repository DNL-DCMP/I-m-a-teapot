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


//Funcion para crear la receta
const user = JSON.parse(localStorage.getItem('user'));

if(user){
    function createRecipe() {
        
        const userId = user.id;
        
        let name = document.querySelector('.recipe-name').value.trim();
        let description = document.querySelector('.recipe-description').value.trim();
        let time = parseInt(document.querySelector('.recipe-time').value.trim());
        let temperatureCook = parseInt(document.querySelector('.recipe-temperatureCook').value.trim());
        let recipePicture = document.querySelector('.recipe-picture').value.trim();
    
        // Corregir obtención de valores para inputs múltiples
        let ingredients = Array.from(document.querySelectorAll('.recipe-ingredients')).map(input => input.value.trim()).filter(value => value !== '');
        let instructions = Array.from(document.querySelectorAll('.recipe-instructions')).map(input => input.value.trim()).filter(value => value !== '');
        let categories = Array.from(document.querySelectorAll('.recipe-categories')).map(input => input.value.trim()).filter(value => value !== '');
        
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
            userId: userId
        };
        console.log(body)
        fetch(`${window.API_URL}/api/v1/recipes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(response => {
            if (response.status === 201) {
                alert("Receta creada con éxito");
                clearForm();
                window.location.href = `user-recipes.html`;
            } else {
                alert("Error al cargar la receta");
            }
        })
        .catch(error => console.error("Error al enviar la receta:", error));
               
    }
}

function clearForm() {
    document.querySelector('.recipe-name').value = ' ';
    document.querySelector('.recipe-description').value = ' ';
    document.querySelector('.recipe-time').value = '';
    document.querySelector('.recipe-temperatureCook').value = '';
    document.querySelector('.recipe-picture').value = '';
    
    const categoriesInputs = document.querySelectorAll('.recipe-categories');
        categoriesInputs.forEach(input => {
            input.value = '';
        });
    
    const ingredientsInputs = document.querySelectorAll('.recipe-ingredients');
        ingredientsInputs.forEach(input => {
            input.value = '';
        });

    const instructionsInputs = document.querySelectorAll('.recipe-instructions');
        instructionsInputs.forEach(input => {
            input.value = '';
        });

    const titleContainer = document.querySelector('.title');
    titleContainer.innerHTML = '';
    const titleElement = document.createElement('h1');
    titleElement.innerText = "Crear receta";
    titleContainer.appendChild(titleElement);
    const submitRecipeBtn = document.getElementById('submit-recipe-btn');
    submitRecipeBtn.innerText = "Crear receta";
    submitRecipeBtn.onclick = createRecipe;
    window.editingRecipeId = null;
}