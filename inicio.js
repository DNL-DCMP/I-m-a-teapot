
const recipesHomePage  = document.getElementById('recipes-container');

const categoryId = [1,2,3,4];
categoryId.forEach(id => {
    fetch('http://localhost:3000/api/v1/categories/${id}/recipes')
        .then(response => response.json())
        .then(data => {

            data.recipes = data.recipes.slice(0,4);
            const categoryElement = showCategories(data);
            recipesHomePage.appendChild(categoryElement);
        })
})

function showCategories (category) {
    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("recipes-container-by-category");

    const titleContainer = document.createElement("h2");
    titleContainer.classList.add("titulo-container");
    titleContainer.textContent = category.name;

    const recipesContainer = document.createElement("div");
    recipesContainer.classList.add("recipes");

    category.recipes.forEach(recipe => {
        const recipeCard = showRecipe(recipe);
        recipesContainer.appendChild(recipeCard);
    });

    categoryContainer.appendChild(titleContainer);
    categoryContainer.appendChild(recipesContainer);
    
    return categoryContainer;
}

function showRecipe (recipe){
    const div = document.createElement("div");
    div.classList.add("recipe-card");

    div.innerHTML = `
        <div class="recipe-image">
            <img src="${recipe.image}" class="image-recipe">
        </div>
        <div class="recipe-info">
            <div class="recipe-name">
                <h3>${recipe.name}</h3>
            </div>
            <div class="recipe-description">
                <p class="recipe-description">${recipe.description}</p>
            </div>
            <button id="boton-ver-receta" onclick="viewRecipe(${recipe.id})">Ver receta</button>
        </div>
    `;

    return div;
}