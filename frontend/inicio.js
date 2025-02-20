const Container = document.querySelector('.container');

fetch(`${window.API_URL}/api/v1/recipes`)
  .then((response) => response.json())
  .then((recipe) => {
    const recetasAleatorias = data.sort(() => 0.5 - Math.random()).slice(0, 8);
    createCard(recetasAleatorias);
  });

function createCard (recipe) {
    const topRecipes = document.createElement('section');
    topRecipes.classList.add('container top-recipes');

    const titleContainer = document.createElement('h1');
    titleContainer.classList.add('heading-1');
    titleContainer.innerText = "Explora las mejores recetas!";
    topRecipes.appendChild(titleContainer);

    const recipesContainer = document.createElement('div');
    recipesContainer.classList.add('container-recipes');

    const cardRecipe = document.createElement('div');
    cardRecipe.classList.add('card-recipe');

    let img = document.createElement('img');
    img.src = recipe.image;
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
    buttonContainer.classList.add('button-containet');

    let linkViewRecipe = document.createElement('a');
    linkViewRecipe.classList.add('view-recipe-btn');
    linkViewRecipe.innerText = "Ver receta";
    linkViewRecipe.href = `recipes-details.html?id=${recipe.id}`;
    buttonContainer.appendChild(linkViewRecipe);
    cardRecipe.appendChild(buttonContainer);

    recipesContainer.appendChild(cardRecipe);

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