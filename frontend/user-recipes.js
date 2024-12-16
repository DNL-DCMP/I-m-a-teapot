const { link } = require("fs");

let ordenAscendente = true; 

function ordenarTarjetas() {
    const contenedor = document.querySelector('.container-recipes');

    const tarjetas = Array.from(contenedor.getElementsByClassName('card-recipe'));

    tarjetas.sort((a, b) => {
        const textoA = a.textContent || a.innerText;
        const textoB = b.textContent || b.innerText;
        return ordenAscendente ? textoA.localeCompare(textoB) : textoB.localeCompare(textoA);
    });

    contenedor.innerHTML = '';

    tarjetas.forEach(tarjeta => contenedor.appendChild(tarjeta));

    const botonOrdenar = document.getElementById('boton-ordenar');
    if (ordenAscendente) {
        botonOrdenar.innerHTML = 'Ordenar de Z a A';
    } else {
        botonOrdenar.innerHTML = 'Ordenar de A a Z';
    }

    ordenAscendente = !ordenAscendente;
}

const recipesContainer = document.querySelector('.container-recipes');

/*Falta agregar el id del usuario logueado*/

fetch("http://localhost:3000/ap1/v1/users/:id/recipes")
    .then(response => response.json())
    .then(recipes => {
        recipes.forEach((recipe) => {
            let div = document.createElement('div');
            div.classList.add('crad-recipe');

            /*Hay que agregarlo a schema.prisma y el endpoint de recipes*/
            let img = document.createElement('img');
            img.src = recipe.image;

            /* Titulo de la receta */
            let titulo = document.createElement('h3');
            titulo.classList.add('recipe-name');
            titulo.innerText = recipe.name;

            /*Descripcion de la receta */
            let desc = document.createElement('p');
            desc.classList.add('recipe-description');
            desc.innerText = recipe.description;

            /* Boton de ver receta */
            let linkViewRecipe = document.createElement('a');
            linkViewRecipe.classList.add('view-recipe-btn');
            linkViewRecipe.innerText = "Ver receta";
            linkViewRecipe.href = `recipe-details.html?id=${recipe.id}`;

            div.appendChild(img);
            div.appendChild(titulo);
            div.appendChild(desc);
            div.appendChild(linkViewRecipe);

            recipesContainer.appendChild(div);

        })
    })

