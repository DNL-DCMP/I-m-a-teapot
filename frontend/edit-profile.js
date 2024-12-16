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

/*Agrega el nombre del usuario a el header principal  (falta agregar la imagen a schema.prisma*/
fetch("http://localhost:3000/api/v1/users/:id")
    .then(response => response.json())
    .then(data => {
        const nameMain = document.querySelector('.name-user');
        nameMain.innerText = data.name + data.lastname;

    });

/*Función para editar el perfil del usuario*/
function editProfile() {
    const name = document.querySelector('#first-name').value;
    const lastname = document.querySelector('#last-name').value;
    const email = document.querySelector('#email').value;

    let body = {
        name: name,
        lastname: lastname,
        email: email
    };

    /*Falta pasarle el id del usuario*/
    fetch("http://127.0.0.1:3000/api/v1/users/:id", {
        method: 'PUT',
        headers: {
            'Content-Type': 'aplication/json'
        },

        body: JSON.stringify(body)
    })
        .then(response => {
            if(response.status !== 201){
                alert("Error al modificar el perfil");
            }
        })
}
