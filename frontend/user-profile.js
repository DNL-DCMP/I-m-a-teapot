document.querySelector('.menu-btn').addEventListener('click', () => {
  const nav = document.querySelector('.nav');
  nav.classList.toggle('active');
})

const user = JSON.parse(localStorage.getItem('user'));

if(user){
    const userId = user.id;

    fetch(`${window.API_URL}/users/${userId}`)
    .then(response => response.json())
    .then(data => {
        const nameMain = document.querySelector('.user-name');
        const email = document.querySelector('.user-email');
        const biography = document.querySelector('.biography');
        const profilePicture = document.querySelector('#profilePicture');

        nameMain.innerText = data.name;
        email.innerText = data.email;
        biography.innerText = data.biography;

        if (data.profilePicture) {
          profilePicture.src = data.profilePicture;
        } else if (data.profilePicture === null){
          profilePicture.src = 'img/cookiecheseecake.webp'; // Imagen por defecto si no tiene una URL
        }

        if (!data.biography) { // Verifica si la biografía es null, undefined o una cadena vacía
          const hiddenBio = document.querySelector("#biography");
          hiddenBio.classList.add("hidden"); // Agrega la clase 'hidden' para ocultar el elemento
        }

        const editProfileBtn = document.querySelector('.edit-profile-btn');
        editProfileBtn.dataset.recipeId = user.id;
        editProfileBtn.addEventListener('click', (event) => {
          const userId = event.target.dataset.userId;
          window.location.href = `edit-profile.html?id=${userId}`;
      });
    });
}

if (!user) {
  localStorage.removeItem('user'); 
  window.location.reload(); // Para reiniciar la sesión
}

// Logout de usuario

const logoutButton = document.getElementById("logout");

logoutButton.addEventListener('click', async () => {
  try {
    const userId = user.id;

    const response = await fetch(`${window.API_URL}/api/v1/logout`, {
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
      window.location.href = 'index.html'; // Redirige al usuario a inicio
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
    const response = await fetch(`${window.API_URL}/api/v1/users/${userId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('Usuario eliminado exitosamente');
      localStorage.clear();
      window.location.href = 'index.html';
    } else {
      const error = await response.json();
      alert('Error al eliminar el usuario: ' + error.error);
    }
  } catch (err) {
    console.error(err);
    alert('Hubo un problema con la solicitud');
  }
});
