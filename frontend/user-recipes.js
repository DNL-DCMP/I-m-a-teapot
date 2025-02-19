const apiUrl = process.env.API_URL || 'localhost:3000';

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

const user = JSON.parse(localStorage.getItem('user'));
const recipesContainer = document.querySelector('.container-recipes');

if(user){

    const userId = user.id;

    fetch(`http://${apiUrl}/api/v1/users/${userId}/recipes`)
        .then(response => response.json())
        .then(recipes => {
            recipes.forEach((recipe) => {
                let div = document.createElement('div');
                div.classList.add('card-recipe');

                let img = document.createElement('img');
                img.src = recipe.recipePicture;

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
                linkViewRecipe.addEventListener('click', () => {
                    document.cookie = `recipeid=${recipe.id}; path=/; max-age=3600`; // Expira en 1 hora
                    window.location.href = 'recipes-details.html';
                });
                
                div.appendChild(img);
                div.appendChild(titulo);
                div.appendChild(desc);
                div.appendChild(linkViewRecipe);

                recipesContainer.appendChild(div);

            })
        })
}

