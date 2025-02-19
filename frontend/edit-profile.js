document.querySelector('.menu-btn').addEventListener('click', () => {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('active');
});

const biography = document.querySelector('.biography');
if (biography) {
    biography.addEventListener("keyup", event => {
        biography.style.height = "auto";
        let sclHeight = event.target.scrollHeight;
        biography.style.height = `${sclHeight}px`;
    });
}

const user = JSON.parse(localStorage.getItem('user'));


if(user){
    const userId = user.id;

    fetch(`${window.API_URL}/api/v1/users/${userId}`)
        .then(response => response.json())
        .then(user => {
            const name = document.querySelector('.user-name');
            const biography = document.querySelector('.biography');
            const email = document.querySelector('.user-email');
            const profilePicture = document.querySelector('#profilePicture');

            name.value = user.name;
            biography.value = user.biography;
            email.value = user.email;
            profilePicture.src = user.profilePicture;

            document.getElementById('pictureInput').addEventListener('input', function() {
                let url = this.value.trim(); 
                let profilePicture = document.getElementById('profilePicture');
            
                if (url) { 
                    profilePicture.src = url;
                } else {
                    profilePicture.src = "img/cookiecheseecake.png";
                }
            });
            

            const submitUserBtn = document.querySelector('#saveButton');
            submitUserBtn.onclick = () => updateUser(user.id);

            window.editingUserId = user.id;
        }) 
        .catch(error => console.error("Error al cargar el usuario", error));
}

document.querySelector('.picture-user-profile').addEventListener('click', function(event) {
    let input = document.getElementById('pictureInput');
    let profilePicture = document.getElementById('profilePicture');

    if (event.target !== input) {
        input.style.display = 'block';
        input.focus();
        profilePicture.style.display = 'none';
    }
});

document.addEventListener('click', function(event) {
    let input = document.getElementById('pictureInput');
    let pictureContainer = document.querySelector('.picture-user-profile');
    let profilePicture = document.getElementById('profilePicture');

    // Si el clic no fue en el input ni en el contenedor de la imagen, ocultar el input y mostrar la imagen
    if (event.target !== input && !pictureContainer.contains(event.target)) {
        input.style.display = 'none';
        profilePicture.style.display = 'block';
    }
});


function updateUser(id){
    let name = document.querySelector('.user-name').value;
    let biography = document.querySelector('.biography').value
    let email = document.querySelector('.user-email').value
    let password = document.querySelector('#newPassword').value;
    let confirmPassword = document.querySelector('#confirmPassword').value;
    let profilePicture = document.querySelector('#profilePicture').src;

    let body = {
        name: name,
        biography: biography,
        email: email,
        profilePicture: profilePicture
    }

    if (password && confirmPassword) {
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
            return;
        }
        body.password = password;
    }

    fetch(`${window.API_URL}/api/v1/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(response => {
        if (response.ok) {
            alert('El usuario se actualizó con éxito');
            window.location.href="user-profile.html"
        }
        console.log('Usuario actualizado', response);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Ocurrió un problema al intentar guardar los cambios');
    });

}