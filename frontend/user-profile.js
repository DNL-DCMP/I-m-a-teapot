
//  import { clear } from "console";
//  import { use } from "../backend/src/routes/users";

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
        const email = document.querySelector('.email');
        const biography = document.querySelector('.biografia')
        const profilePicture = document.querySelector('#profilePicture');

        nameMain.innerText = data.name;
        email.innerText = data.email;
        biography.innerText = data.biography;

        if (data.profilePicture) {
          profilePicture.src = data.profilePicture;
        } else {
          profilePicture.src = 'img/cookiecheseecake.webp'; // Imagen por defecto si no tiene una URL
        }
    });
}

// Logout de usuario

const logoutButton = document.getElementById("logout");

logoutButton.addEventListener('click', async () => {
  try {
    const userId = user.id;

    const response = await fetch('http://localhost:3000/api/v1/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }), // Envía el ID del usuario al servidor
    });

    const data = await response.json();
    if (response.ok) {
      console.log(data.message);
      localStorage.clear(); // Borra el almacenamiento local
      window.location.href = 'inicio.html'; // Redirige al usuario a inicio
    } else {
      console.error('Error:', data.message);
    }
  } catch (error) {
    console.error('Error al desloguear:', error);
  }
});

// Eliminar usuario

const deleteButton = document.getElementById('deleteUser');

deleteButton.addEventListener('click', async () => {
  const userId = user.id

  const confirmation = confirm('¿Estás seguro de que deseas eliminar tu cuenta?');
  if (!confirmation) return;

  try {
    const response = await fetch(`http://localhost:3000/api/v1/users/${userId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('Usuario eliminado exitosamente');
      localStorage.clear();
      window.location.href = 'inicio.html';
    } else {
      const error = await response.json();
      alert('Error al eliminar el usuario: ' + error.error);
    }
  } catch (err) {
    console.error(err);
    alert('Hubo un problema con la solicitud');
  }
});
