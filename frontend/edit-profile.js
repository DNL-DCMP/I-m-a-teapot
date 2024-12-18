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

const user = JSON.parse(localStorage.getItem('user'));

if(user){
    const userId = user.id;

    fetch(`http://localhost:3000/api/v1/users/${userId}`)
    .then(response => response.json())
    .then(data => {
        const nameMain = document.querySelector('.name-user');
        const profilePicture = document.querySelector('#profilePicture');

        nameMain.innerText = data.name;

        if (data.profilePicture) {
          profilePicture.src = data.profilePicture;
        } else {
          profilePicture.src = 'img/cookiecheseecake.webp'; // Imagen por defecto si no tiene una URL
        }
    });
}

const userId = user.id;

document.getElementById('saveButton').addEventListener('click', (event) => {
    event.preventDefault(); // Evita la recarga de la página

    // Obtener los valores de los inputs
    const name = document.querySelector('#first-name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const biography = document.querySelector('#biography').value.trim();
    const profilePicture = document.querySelector('#imgProfile').value.trim();
    const password = document.querySelector('#newPassword').value.trim();
    const confirmPassword = document.querySelector('#confirmPassword').value.trim();

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
        return; // Detener la ejecución si no coinciden
    }
    
    // Construir el objeto con los datos
    const data = {
        name: name,
        email: email,
        biography: biography,
        profilePicture: profilePicture,
        password: password
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
            window.location.href = "user-profile.html";
        } else {
            alert('Hubo un error al actualizar el perfil');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Ocurrió un problema al intentar guardar los cambios');
    });
});