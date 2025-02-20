const Container = document.querySelector('.container');

fetch(`${window.API_URL}/api/v1/recipes`)
  .then((response) => response.json())
  .then((data) => { 
    const recetasAleatorias = data.sort(() => 0.5 - Math.random()).slice(0, 9); // 9 recetas en total
    createRecipeSection(recetasAleatorias);
  })
  .catch(error => console.error("Error al obtener las recetas:", error));

function createRecipeSection(recipes) {

    const topRecipes = document.createElement('section');
    topRecipes.classList.add('container', 'top-recipes');

    const titleContainer = document.createElement('h1');
    titleContainer.classList.add('heading-1');
    titleContainer.innerText = "Explora las mejores recetas!";
    topRecipes.appendChild(titleContainer);

    const recipesContainer = document.createElement('div');
    recipesContainer.classList.add('container-recipes');
    recipesContainer.style.display = "grid";
    recipesContainer.style.gridTemplateColumns = "repeat(3, 1fr)";
    recipesContainer.style.gap = "20px";

    recipes.forEach(recipe => {
        const cardRecipe = document.createElement('div');
        cardRecipe.classList.add('card-recipe');

        let img = document.createElement('img');
        img.src = recipe.image;
        img.alt = recipe.name;
        cardRecipe.appendChild(img);

        let titleRecipe = document.createElement('h3');
        titleRecipe.classList.add('recipe-name');
        titleRecipe.innerText = recipe.name;
        cardRecipe.appendChild(titleRecipe);

        let recipeDesc = document.createElement('p');
        recipeDesc.classList.add('recipe-description');
        recipeDesc.innerText = recipe.description;
        cardRecipe.appendChild(recipeDesc);

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');

        let linkViewRecipe = document.createElement('a');
        linkViewRecipe.classList.add('view-recipe-btn');
        linkViewRecipe.innerText = "Ver receta";
        linkViewRecipe.href = `recipes-details.html?id=${recipe.id}`;
        buttonContainer.appendChild(linkViewRecipe);
        cardRecipe.appendChild(buttonContainer);

        recipesContainer.appendChild(cardRecipe);
    });

    topRecipes.appendChild(recipesContainer);
    Container.appendChild(topRecipes);
}

/* Autentication */
document.addEventListener("DOMContentLoaded", () => {
    // Obtener el usuario desde localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    // Verificar si el usuario existe y si está logueado
    if (user && user.isLoggedIn) {
        console.log("El usuario está logueado:", user.isLoggedIn);

        const authButtons = document.querySelectorAll(".auth");
        authButtons.forEach(button => button.classList.add("hidden"));
        
    } else {
        console.log("El usuario no está logueado o no existe.");
        const notAuthButtons = document.querySelectorAll(".notAuth");
        notAuthButtons.forEach(button => button.classList.add("hidden") )
    }
});