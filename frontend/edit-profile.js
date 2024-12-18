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

/*Agrega el nombre del usuario a el header principal  (falta agregar la imagen a schema.prisma
fetch("http://localhost:3000/api/v1/users/:id")
    .then(response => response.json())
    .then(data => {
        const nameMain = document.querySelector('.name-user');
        nameMain.innerText = data.name + data.lastname;

    });
    */
/*Función para editar el perfil del usuario*/

const user = JSON.parse(localStorage.getItem('user'));
const userId = user.id;

document.getElementById('saveButton').addEventListener('click', (event) => {
    event.preventDefault(); // Evita la recarga de la página

    // Obtener los valores de los inputs
    const firstName = document.querySelector('#first-name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const bio = document.querySelector('#biography').value.trim();

    // Validaciones
    if (!firstName || !email || !bio) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    // Construir el objeto con los datos
    const data = {
        firstName: firstName,
        email: email,
        bio: bio,
    };

    // Enviar los datos con fetch
    fetch(`http://localhost:3000/api/v1/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // Convertir el objeto en JSON
    })
    .then(response => {
        if (response.ok) {
            alert('Perfil actualizado exitosamente');
        } else {
            alert('Hubo un error al actualizar el perfil');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Ocurrió un problema al intentar guardar los cambios');
    });
});