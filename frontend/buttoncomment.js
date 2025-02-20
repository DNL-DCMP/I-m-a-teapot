// Obtener el recipeId desde las cookies
const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
    const [key, value] = cookie.split("=");
    acc[key] = value;
    return acc;
}, {});

const user = JSON.parse(localStorage.getItem('user'));

// Función para mostrar los comentarios en la página
function loadComments() {
    try {
        const recipeId = cookies.recipeid;
        const userId = user.id;
        fetch(`${window.API_URL}/api/v1/recipes/${recipeId}/comments`)
            .then(response => response.json())
            .then(comments => {
                const commentsSection = document.getElementById('commentsSection');
                commentsSection.innerHTML = '';

                comments.forEach(comment => {
                    const commentDiv = document.createElement('div');
                    commentDiv.classList.add('comment');

                    commentDiv.innerHTML = `
                        <p><strong>${comment.user.name}</strong> (Calificación: ${comment.rating} estrellas)</p>
                        <p>${comment.content}</p>
                    `;

                    // Agregar iconos solo si el usuario autenticado es el autor del comentario
                    if (comment.user.id === userId) {
                        const actionsDiv = document.createElement('div');
                        actionsDiv.classList.add('comment-actions');

                        // Icono de editar con Boxicons
                        const editIcon = document.createElement('span');
                        editIcon.innerHTML = '<i class="bx bx-edit"></i>'; // Icono de editar de Boxicons
                        editIcon.classList.add('edit-icon');
                        editIcon.onclick = () => {
                            document.cookie = `commentId=${comment.id}; path=/`; 
                            window.location.href = `edit-comment.html`;
                        };

                        // Icono de eliminar con Boxicons
                        const deleteIcon = document.createElement('span');
                        deleteIcon.innerHTML = '<i class="bx bx-trash"></i>'; // Icono de eliminar de Boxicons
                        deleteIcon.classList.add('delete-icon');
                        deleteIcon.onclick = () => deleteComment(comment.id, commentDiv);

                        actionsDiv.appendChild(editIcon);
                        actionsDiv.appendChild(deleteIcon);
                        commentDiv.appendChild(actionsDiv);
                    }

                    commentsSection.appendChild(commentDiv);
                });
            });
    } catch (error) {
        console.error("Error al cargar comentarios:", error);
        document.getElementById('commentsSection').innerHTML = "<p>Error al cargar comentarios.</p>";
    }
}

// Función para eliminar comentario
async function deleteComment(commentId, commentElement) {
    if (!confirm("¿Seguro que quieres eliminar este comentario?")) return;

    try {
        const recipeId = cookies.recipeid;
        const response = await fetch(`${window.API_URL}/api/v1/recipes/${recipeId}/comments/${commentId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error(`Error HTTP! Estado: ${response.status}`);
        }

        // Eliminar el comentario del DOM después de eliminarlo en el backend
        commentElement.remove();
    } catch (error) {
        console.error("Error al eliminar el comentario:", error);
        alert("No se pudo eliminar el comentario. Inténtalo de nuevo.");
    }
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

// Función para limpiar estrellas después de enviar un comentario
function clearStarRating() {
    document.getElementById('ratingInput').value = ''; // Limpiar el valor del input oculto
    updateStarRating(0); // Vaciar las estrellas en la UI
}

// Enviar un comentario
const commentForm = document.getElementById('commentForm');
commentForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evitar que el formulario se recargue
    
    const content = document.getElementById('opinion').value;
    const rating = document.getElementById('ratingInput').value; // Aquí debes manejar el valor de la calificación
    const userId = user.id;

    // Verificar si el usuario seleccionó una puntuación
    if (!rating) {
        alert('Por favor, selecciona una puntuación de estrellas.');
        return;
    }

    try {
        const recipeId = cookies.recipeid;
        console.log("recipeId:",recipeId);

        const response = await fetch(`${window.API_URL}/api/v1/recipes/${recipeId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content, rating, userId })
        });

        if (!response.ok) {
            const errorData = await response.json(); // Aquí intentas parsear la respuesta como JSON
            throw new Error(`Error HTTP! estado: ${response.status}, mensaje: ${errorData.message || 'Error desconocido'}`);
        }

        const newComment = await response.json(); // Asegúrate de que la respuesta es JSON
        loadComments(recipeId); // Recargar comentarios
        commentForm.reset(); // Limpiar formulario
        clearStarRating(); // Vaciar las estrellas
    } catch (error) {
        console.error("Error al enviar comentario:", error);
        alert("Error al enviar comentario. Inténtalo de nuevo.");
    }
});

// Cargar comentarios al cargar la página (ahora necesita recipeId)
window.addEventListener('DOMContentLoaded', () => {
    if (cookies.recipeid) { // Solo cargar si recipeId está disponible
        loadComments(cookies.recipeid);
    } else {
        console.warn("Falta el ID de la receta. No se pueden cargar los comentarios.");
    }
});

function goBack() {
    window.history.back(); // Vuelve a la página anterior
}