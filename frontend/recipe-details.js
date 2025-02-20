function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
    const [key, value] = cookie.split("=");
    acc[key] = value;
    return acc;
}, {});

const recipeId = cookies.recipeid;

fetch(`${window.API_URL}/api/v1/recipes/${recipeId}`)
  .then(response => response.json())
  .then(recipe => {
    // Crear contenedor principal para la receta
    let recipeContainer = document.createElement('div');
    recipeContainer.classList.add('container-recipe');

    // Mostrar las categorías de la receta
    let categoriesContainer = document.createElement('div');
    categoriesContainer.classList.add('categories-recipes-container');
    let categoriesList = document.createElement('ul');
    categoriesList.classList.add('categories-recipes-list');
    for (let i = 0; i < recipe.categories.length; i++) {
      let categoryItem = document.createElement('li');
      categoryItem.innerText = "#" + " " + capitalizeFirstLetter(recipe.categories[i]);
      categoriesList.appendChild(categoryItem);
    }
    categoriesContainer.appendChild(categoriesList);
    recipeContainer.appendChild(categoriesContainer);

    // Mostrar la imagen de la receta
    if(recipe.recipePicture){
      let imageRecipe = document.createElement('img');
      imageRecipe.classList.add('recipe-image');
      imageRecipe.src = recipe.recipePicture;
      recipeContainer.appendChild(imageRecipe);
    }

    // Mostrar el nombre de la receta
    let recipeName = document.createElement('h1');
    recipeName.classList.add('recipe-name');
    recipeName.innerText = recipe.name;
    recipeContainer.appendChild(recipeName);

    // Mostrar la descripción de la receta
    let recipeDescription = document.createElement('p');
    recipeDescription.classList.add('recipe-description');
    recipeDescription.innerText = recipe.description;
    recipeContainer.appendChild(recipeDescription);


    // Mostrar el tiempo de preparación
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
    iconoTemp.classList.add('bx', 'bxs-thermometer');
    liTemp.appendChild(iconoTemp);
    let temp = document.createElement('p');
    temp.innerText = recipe.temperatureCook + "°" + " " + "grados";
    liTemp.appendChild(temp);
    infoList.appendChild(liTemp);

    infoRecipe.appendChild(infoList);
    recipeContainer.appendChild(infoRecipe);

    // Mostrar los ingredientes
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

    // Mostrar las instrucciones
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

    // Botones para editar y eliminar receta
    let recipesBtn = document.createElement('div');
    recipesBtn.classList.add('button-recipes');

    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user.id;
    if(userId === recipe.user.id){
      let editRecipeBtn = document.createElement('button');
      editRecipeBtn.classList.add('edit-recipe-btn');
      editRecipeBtn.innerText = "Editar receta";
      editRecipeBtn.dataset.recipeId = recipe.id;
      editRecipeBtn.addEventListener('click', (event) => {
      const recipeId = event.target.dataset.recipeId;
      window.location.href = `edit-recipe.html?id=${recipeId}`;
      });
      recipesBtn.appendChild(editRecipeBtn);

      let deleteRecipeBtn = document.createElement('button');
      deleteRecipeBtn.classList.add('delete-recipe-btn');
      deleteRecipeBtn.innerText = "Borrar receta";
      deleteRecipeBtn.onclick = deleteRecipe;
      recipesBtn.appendChild(deleteRecipeBtn);
    }

    let commentsRecipeBtn = document.createElement('button');
    commentsRecipeBtn.classList.add('comments-recipe-btn');
    commentsRecipeBtn.innerText = "Comentarios";
    commentsRecipeBtn.onclick = () => {
      window.location.href = "buttoncomment.html";
    };

    recipesBtn.appendChild(commentsRecipeBtn);
    recipeContainer.appendChild(recipesBtn);

    // Agregar todo a la página
    const mainContainer = document.querySelector('.main-container');
    mainContainer.appendChild(recipeContainer);
  })
  .catch(error => {
    console.error('Error al obtener la receta:', error);
  });

function deleteRecipe(){
    fetch(`${window.API_URL}/api/v1/recipes/${recipeId}`, {
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