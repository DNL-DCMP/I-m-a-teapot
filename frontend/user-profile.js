
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

<<<<<<< HEAD
const user = JSON.parse(localStorage.getItem('user'));

if(user){
    const userId = user.id;

    fetch(`http://localhost:3000/api/v1/users/${userId}`)
    .then(response => response.json())
    .then(data => {
        const nameMain = document.querySelector('.name-user');
=======

/*Falta agregar el id del usuario
fetch("http://localhost:3000/api/v1/users/:id")
    .then(response => response.json())
    .then(data => {
        const nameMain = document.querySelector('.name-user');
        const name = document.querySelector('.first-name');
        /*Hay que agregar lastname a schema.prisma
        const lastname = document.querySelector('.last-name');
>>>>>>> b0adce14e586543518ca36078fbf56784d3853ce
        const email = document.querySelector('.email');

        nameMain.innerText = data.name;
        email.innerText = data.email;
    });*/

<<<<<<< HEAD
    });
}
=======
// Logout de usuario
const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', () => {
    // Limpiar localStorage
    localStorage.clear();
    window.location.href = 'inicio.html';
});
>>>>>>> b0adce14e586543518ca36078fbf56784d3853ce
