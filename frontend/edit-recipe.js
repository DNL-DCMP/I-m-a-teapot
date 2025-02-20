const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get('id');
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
        picture.value = user.picture;


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
        submitUserBtn.onclick = () => updateRecipe(recipe.id);

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
        }
    })
    .catch(error => console.error("Error al actualizar la receta:", error));
    window.location.href = `user-recipes.html`;
}