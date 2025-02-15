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

const mainContainer = document.querySelector('.main-container');

const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
    const [key, value] = cookie.split("=");
    acc[key] = value;
    return acc;
}, {});

const recipeId = cookies.recipeid;

fetch(`http://localhost:3000/api/v1/recipes/${recipeId}`)
    .then(response => response.json())
    .then(recipe => {
        /*let categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        let backToMyRecipesBtn = document.createElement('button');
        backToMyRecipesBtn.classList.add('back-to-my-recipes-btn');
        let linkRecipes = document.createElement('a');
        linkRecipes.href = "user-recipes.html";
        backToMyRecipesBtn.appendChild(linkRecipes);
        categoryContainer.appendChild(backToMyRecipesBtn);

        let filterContainer = document.createElement('div');
        filterContainer.classList.add('filter-container');
        let categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.innerText = "Categorías";
        filterContainer.appendChild(categoryTitle);
        let hr = document.createElement('hr');
        filterContainer.appendChild(hr);
        let categoryList = document.createElement('ul');
        categoryList.classList.add('categories-list');


        for(let i = 0; i < recipe.categories.length; i++){
            let category = document.createElement('li');
            category.classList.add('category');
            category.innerText = recipe.categories[i];
            categoryList.appendChild(category);
        }

        filterContainer.appendChild(categoryList);
        categoryContainer.appendChild(filterContainer);
        */

        let recipeContainer = document.createElement('div');
        recipeContainer.classList.add('container-recipe');

        /*
        let categoriesContainer = document.createElement('div');
        categoriesContainer.classList.add('categories-recipes-container');
        let categoriesList = document.createElement('ul');
        categoriesList.classList.add('categories-recipes-list');
        for(let i = 0; i < recipe.categories.length; i++){
            let categoriesItem = document.createElement('li');
            categoriesItem.innerText = recipe.categories[i];
            categoriesList.appendChild(categoriesItem);
        }
        categoriesContainer.appendChild(categoriesList);
        recipeContainer.appendChild(categoriesContainer);
        */
       
        let imageRecipe = document.createElement('img');
        imageRecipe.classList.add('recipe-image');
        imageRecipe.src = recipe.recipePicture;
        recipeContainer.appendChild(imageRecipe);

        let recipeName = document.createElement('h1');
        recipeName.classList.add('recipe-name');
        recipeName.innerText = recipe.name;
        recipeContainer.appendChild(recipeName);

        let recipeDescription = document.createElement('p');
        recipeDescription.classList.add('recipe-description');
        recipeDescription.innerText = recipe.description;
        recipeContainer.appendChild(recipeDescription);

        let infoRecipe = document.createElement('div');
        infoRecipe.classList.add('info-recipe');
        let infoList = document.createElement('ul');
        infoList.classList.add('info-list');
        let liTime = document.createElement('li');
        liTime.classList.add('info-item');
        let iconoTime = document.createElement('i');
        iconoTime.classList.add('bx', 'bxs-time');
        liTime.appendChild(iconoTime);
        let time = document.createElement('p');
        time.innerText = recipe.time + " " + "minutos";
        liTime.appendChild(time);
        infoList.appendChild(liTime);

        let liTemp = document.createElement('li');
        liTemp.classList.add('info-item');
        let iconoTemp = document.createElement('i');
        iconoTemp.classList.add('bx','bxs-thermometer');
        liTemp.appendChild(iconoTemp);
        let temp = document.createElement('p');
        temp.innerText = recipe.temperatureCook + "°" + " " + "grados";
        liTemp.appendChild(temp);
        infoList.appendChild(liTemp);

        infoRecipe.appendChild(infoList);
        recipeContainer.appendChild(infoRecipe);


        let ingredientsContainer = document.createElement('div');
        ingredientsContainer.classList.add('ingredients-container');
        let ingredientsTitle = document.createElement('h1');
        ingredientsTitle.classList.add('ingredients-title');
        ingredientsTitle.innerText = "Ingredientes:";
        ingredientsContainer.appendChild(ingredientsTitle);
        let ingredientsList = document.createElement('ul');
        ingredientsList.classList.add('ingredients-list');
        for (let i = 0; i < recipe.ingredients.length; i++) {
            let ingredientsItem = document.createElement('li');
            ingredientsItem.innerText = "—" + " " + recipe.ingredients[i];
            ingredientsList.appendChild(ingredientsItem);
        }
        ingredientsContainer.appendChild(ingredientsList);
        recipeContainer.appendChild(ingredientsContainer);

        let instructionsContainer = document.createElement('div');
        instructionsContainer.classList.add('instructions-container');
        let instructionsTitle = document.createElement('h1');
        instructionsTitle.classList.add('instructions-title');
        instructionsTitle.innerText = "Instrucciones:";
        instructionsContainer.appendChild(instructionsTitle);
        let instructionsList = document.createElement('ul');
        instructionsList.classList.add('instructions-list');
        for (let i = 0; i < recipe.instructions.length; i++) {
            let instructionsItem = document.createElement('li');
            instructionsItem.innerText = recipe.instructions[i];
            instructionsList.appendChild(instructionsItem);
        }
        instructionsContainer.appendChild(instructionsList);
        recipeContainer.appendChild(instructionsContainer);

        let recipesBtn = document.createElement('div');
        recipesBtn.classList.add('button-recipes');

        let editRecipeBtn = document.createElement('button');
        editRecipeBtn.classList.add('edit-recipe-btn');
        editRecipeBtn.innerText = "Editar receta";
        editRecipeBtn.dataset.recipeId = recipe.id;
        editRecipeBtn.addEventListener('click', (event) => {
            const recipeId = event.target.dataset.recipeId;
            window.location.href = `create-recipe.html?id=${recipeId}`;
        });
        recipesBtn.appendChild(editRecipeBtn);

        let deleteRecipeBtn = document.createElement('button');
        deleteRecipeBtn.classList.add('delete-recipe-btn');
        deleteRecipeBtn.innerText = "Borrar receta";
        deleteRecipeBtn.onclick = deleteRecipe;
        recipesBtn.appendChild(deleteRecipeBtn);

        let commentsRecipeBtn = document.createElement('button');
        commentsRecipeBtn.classList.add('comments-recipe-btn');
        commentsRecipeBtn.innerText = "Comentarios";
        commentsRecipeBtn.onclick = () => {
            window.location.href = "buttoncomment.html"
        };

        recipesBtn.appendChild(commentsRecipeBtn);
        recipeContainer.appendChild(recipesBtn);
        mainContainer.appendChild(recipeContainer);
    })

function deleteRecipe(){
    fetch(`http://localhost:3000/api/v1/recipes/${recipeId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if (response.ok) {
                alert('Receta borrada con éxito!');
                window.location.href = 'user-recipes.html';
            } else {
                console.log("Error al borrar la receta");
            }
        })
        .catch(error => {
            alert('Error al borrar la receta');
        });
}