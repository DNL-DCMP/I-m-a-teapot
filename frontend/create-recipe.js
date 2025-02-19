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

const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get('id');
if (recipeId) {
    loadRecipeForEditing(recipeId);
}


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

function loadRecipeForEditing(id){
    fetch(`http://localhost:3000/api/v1/recipes/${id}`)
    .then(response => response.json())
    .then(recipe => {
        const titleContainer = document.querySelector('.title');
            titleContainer.innerHTML = '';
            const titleElement = document.createElement('h1');
            titleElement.innerText = "Editar receta";
            titleContainer.appendChild(titleElement);
        document.querySelector('.recipe-name').value = recipe.name;
        document.querySelector('.recipe-description').value = recipe.description;
        document.querySelector('.recipe-time').value = recipe.time;
        document.querySelector('.recipe-temperatureCook').value = recipe.temperatureCook;
        document.querySelector('.recipe-picture').value = recipe.recipePicture;
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
        const submitRecipeBtn = document.getElementById('submit-recipe-btn');
        submitRecipeBtn.innerText = "Guardar";
        submitRecipeBtn.onclick = () => updateRecipe(recipe.id);

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


//Funcion para crear la receta
const user = JSON.parse(localStorage.getItem('user'));

if(user){
    function updateRecipe(id) {
        const userId = user.id;
    
        let name = document.querySelector('.recipe-name').value;
        let description = document.querySelector('.recipe-description').value;
        let time = parseInt(document.querySelector('.recipe-time').value);
        let temperatureCook = parseInt(document.querySelector('.recipe-temperatureCook').value);
        let recipePicture = document.querySelector('.recipe-picture').value;
        
        let ingredients = Array.from(document.querySelectorAll('.recipe-ingredients')).map(input => input.value);
        let instructions = Array.from(document.querySelectorAll('.recipe-instructions')).map(input => input.value);
    
        let body = {
            name: name,
            description: description,
            time: time,
            temperatureCook: temperatureCook,
            recipePicture: recipePicture,
            ingredients: ingredients,
            instructions: instructions,
            userId: userId
        };
    
        fetch(`http://localhost:3000/api/v1/recipes/${id}`, {
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
                clearForm();
            }
        })
        .catch(error => console.error("Error al actualizar la receta:", error));
        window.location.href = `user-recipes.html`;
    }

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
        if(!name || !description || isNaN(time) || isNaN(temperatureCook) || ingredients.length === 0 || instructions.length === 0 || categories.length === 0){
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
        fetch(`http://localhost:3000/api/v1/recipes`, {
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