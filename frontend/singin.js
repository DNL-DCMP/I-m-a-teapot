const apiUrl = process.env.API_URL || "http://localhost:3000";
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});

document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Obtén los valores de los inputs
    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    console.log("Datos enviados al back-end:", { name, email, password }); // Depuración

    try {
        const response = await fetch(`${apiUrl}/api/v1/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();
        console.log("Respuesta del servidor:", data);

        if (response.ok) {
            console.log("Registro exitoso:", data);

            // Redirigir al formulario de inicio de sesión
            document.getElementById("sign-in-btn").click(); // Cambiar a modo inicio de sesión
        } else {
            // Manejar errores de validación de registro
            if (data.error) {
                alert(`Error: ${data.error}`); // Mensaje de error del servidor
            } else {
                alert("Error en el registro. Verifica los datos e inténtalo nuevamente.");
            }
        }
    } catch (error) {
        console.error("Error al enviar datos:", error);
        alert("Error al conectar con el servidor.");
    }
});


// Si el usuario se esta registrando, lo lleva la parte de registro de la pagina
if (location.hash === '#registerForm') {
    const myButton = document.getElementById('sign-up-btn');    
    myButton.click();
}

//Tomar los datos de inicio de secion
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Evita que la página se recargue

    // Obtener los valores de los campos
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        // Enviar los datos al backend
        const response = await fetch(`${apiUrl}/api/v1/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json(); // Convertir la respuesta a JSON

        // Verificar si el inicio de sesión fue exitoso
        if (response.ok) {
            document.getElementById("message").innerText = "Inicio de sesión exitoso.";
            console.log("Usuario:", data.user); // Mostrar la estructura completa del usuario

            // Almacenar el usuario en localStorage
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = "index.html";
        } else {
            document.getElementById("message").innerText = `Error: ${data.message}`;
        }
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        document.getElementById("message").innerText = "Error al conectar con el servidor.";
    }
});