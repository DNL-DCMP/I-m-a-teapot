function goBack() {
    window.history.back(); // Vuelve a la página anterior
}
// Agregar evento para interactuar con las estrellas
document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', function() {
        const rating = this.getAttribute('data-value'); // Obtiene el valor de la estrella clickeada
        document.getElementById('ratingInput').value = rating; // Guarda el rating en un input oculto
        updateStarRating(rating); // Llama a la función para actualizar la UI
    });
});

function updateStarRating(rating) {
    document.querySelectorAll('.star').forEach(star => {
        if (parseInt(star.getAttribute('data-value')) <= parseInt(rating)) {
            star.classList.add('bxs-star'); // Cambia el ícono a estrella llena
            star.classList.remove('bx-star'); // Remueve el ícono de estrella vacía
        } else {
            star.classList.add('bx-star'); // Asegura que las estrellas no seleccionadas sean vacías
            star.classList.remove('bxs-star'); // Remueve la estrella llena
        }
    });
}

// Función para obtener el valor de una cookie por nombre
function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === name) {
            return value;
        }
    }
    return null;
}

// Obtener el commentId desde la cookie
const commentId = getCookie('commentId');
const recipeId = getCookie("recipeid");

fetch(`${window.API_URL}/api/v1/recipes/${recipeId}/comments/${commentId}`)
    .then(response => response.json())
    .then(comment => {
        console.log(comment)
        if (comment) {
            document.getElementById('opinion').value = comment.content;
            document.getElementById('ratingInput').value = comment.rating;

            // Obtener todas las estrellas y resetearlas
            const stars = document.querySelectorAll('.star');
            stars.forEach(star => {
                star.classList.remove('bxs-star'); // Usa 'bxs-star' en lugar de 'bx-star-filled'
                star.classList.add('bx-star');
            });

            // Aplicar las estrellas correctas según la respuesta del backend
            comment.stars.forEach(star => {
                const starElement = document.querySelector(`.star[data-value="${star.value}"]`);
                if (starElement) {
                    if (star.filled) {
                        starElement.classList.add('bxs-star'); 
                        starElement.classList.remove('bx-star');
                    }
                }
            });
        }
    })
    .catch(error => console.error("Error al cargar el comentario:", error));
        
document.getElementById("commentForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que la página se recargue

    // Obtener el ID del comentario y la receta desde las cookies
    const commentId = getCookie("commentId");
    const recipeId = getCookie("recipeid");

    if (!commentId || !recipeId) {
        console.error("No se encontraron los IDs en las cookies.");
        return;
    }

    // Obtener la nueva información del formulario
    const updatedContent = document.getElementById("opinion").value;
    const updatedRating = document.getElementById("ratingInput").value;

    // Construir el objeto con los nuevos datos
    const updatedComment = {
        content: updatedContent,
        rating: parseInt(updatedRating)
    };

    // Enviar la petición PUT al backend
    fetch(`${window.API_URL}/api/v1/recipes/${recipeId}/comments/${commentId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedComment)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al actualizar el comentario.");
        }
        return response.json();
    })
    .then(data => {
        console.log("Comentario actualizado con éxito:", data);
        alert("Comentario actualizado correctamente");
        window.location.href = "buttoncomment.html";
    })
    .catch(error => {
        console.error("Hubo un problema con la actualización:", error);
        alert("No se pudo actualizar el comentario.");
    });
});