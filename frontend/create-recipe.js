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

//Funcion para crear la receta
const user = JSON.parse(localStorage.getItem('user'));

if(user){
    function createRecipe() {

        const userId = user.id;

        let name = document.querySelector('.recipe-name').value;
        let description = document.querySelector('.recipe-description').value;
        let time = document.querySelector('.recipe-time').value;
        let temperatureCook = document.querySelector('.recipe-temperatureCook').value
    
        // Corregir obtención de valores para inputs múltiples
        let ingredients = Array.from(document.querySelectorAll('.recipe-ingredients')).map(input => input.value);
        let instructions = Array.from(document.querySelectorAll('.recipe-instructions')).map(input => input.value);
        let categories = Array.from(document.querySelectorAll('.recipe-categories')).map(input => input.value);
        
        let body = {
            name: name,
            description: description,
            time: time,
            temperatureCook: temperatureCook,
            ingredients: ingredients,
            instructions: instructions,
            // Faltaría implementar el manejo de la imagen si es necesario
            // image: image,
            categories: categories,
            userId: userId
        };
    
        fetch(`http://localhost:3000/api/v1/recipes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(response => {
            if (response.status !== 201) {
                alert("Error al cargar la receta");
            } else {
                console.log("Receta creada");
                clearForm();
            }
        })
        .catch(error => {
            console.error("Error al enviar la receta:", error);
        });
    }
}


function clearForm() {
    document.querySelector('.recipe-name').value = ' ';
    document.querySelector('.recipe-description').value = ' ';
    document.querySelector('.recipe-time').value = '';
    document.querySelector('.recipe-temperatureCook').value = '';
    
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