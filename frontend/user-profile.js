
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

/*Falta agregar el id del usuario*/
fetch("http://localhost:3000/api/v1/users/:id")
    .then(response => response.json())
    .then(data => {
        const nameMain = document.querySelector('.name-user');
        const name = document.querySelector('.first-name');
        /*Hay que agregar lastname a schema.prisma*/
        const lastname = document.querySelector('.last-name');
        const email = document.querySelector('.email');

        nameMain.innerText = data.name + data.lastname;

        name.innerText = data.name;
        lastname.innerText = data.lastname;
        email.innerText = data.email;

    });
