const allStar = document.querySelectorAll('.rating .star');
const ratingValue = document.querySelector('.ratingInput');
const commentForm = document.getElementById('commentForm');
const opinionTextarea = document.getElementById('opinion');
const commentsSection = document.getElementById('commentsSection');
const stars = document.querySelectorAll('.rating .star');
const ratingInput = document.getElementById('ratingInput');

// Lógica para manejar la selección de estrellas en el formulario
allStar.forEach((item, idx) => {
  item.addEventListener('click', function () {
    // Establecer el valor de la calificación en el input oculto
    ratingInput.value = idx + 1; // Guardar la calificación (1 a 5)

    // Actualizar las clases para las estrellas seleccionadas
    allStar.forEach((star, i) => {
      if (i <= idx) {
        star.classList.replace('bx-star', 'bxs-star');  // Estrella llena
      } else {
        star.classList.replace('bxs-star', 'bx-star');  // Estrella vacía
      }
    });
  });
});

// Función para resaltar las estrellas cuando el ratón pasa por encima
stars.forEach((star, index) => {
  star.addEventListener('mouseenter', () => {
    // Resaltar las estrellas cuando el usuario pasa el ratón
    resetStars();
    highlightStars(index + 1);  // Resaltar las estrellas hasta el índice
  });

  star.addEventListener('mouseleave', () => {
    // Restaurar el color de las estrellas cuando el ratón sale
    resetStars();
    highlightStars(ratingInput.value); // Mantener la calificación actual
  });

  star.addEventListener('click', () => {
    // Establecer la calificación en el input oculto cuando se hace clic
    ratingInput.value = index + 1;
    resetStars();
    highlightStars(index + 1);  // Resaltar las estrellas hasta el índice
  });
});

// Función para resaltar las estrellas al pasar el ratón
function highlightStars(count) {
  stars.forEach((star, index) => {
    if (index < count) {
      star.classList.add('selected');
    } else {
      star.classList.remove('selected');
    }
  });
}

// Función para restablecer las estrellas (quitar el color de las estrellas)
function resetStars() {
  stars.forEach(star => {
    star.classList.remove('hover', 'selected');
  });
}

// Función para crear un comentario
function createComment(rating, opinion) {
  const comment = document.createElement('div');
  comment.classList.add('comment');

  // Crear las estrellas para el comentario con las clases correctas de Boxicons
  let starsHtml = '';
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      starsHtml += '<i class="bx bxs-star star"></i>';  // Estrella llena
    } else {
      starsHtml += '<i class="bx bx-star star"></i>';  // Estrella vacía
    }
  }

  // Crear el contenido del comentario
  const commentContent = `
    <div class="rating">${starsHtml}</div>
    <p>${opinion}</p>
    <div class="author">Usuario Anónimo</div>
    <div class="date">${new Date().toLocaleString()}</div>
    <div class="delete-btn" onclick="deleteComment(this)">Eliminar</div>
  `;
  
  comment.innerHTML = commentContent;
  commentsSection.appendChild(comment);
}

// Manejar el envío del formulario
commentForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const opinion = opinionTextarea.value.trim();

  // Asegurarse de que el comentario no esté vacío y que haya una calificación seleccionada
  if (opinion !== '' && ratingInput.value !== '') {
    const rating = parseInt(ratingInput.value, 10);  // Obtener la calificación de las estrellas
    createComment(rating, opinion);  // Crear el comentario con las estrellas y la opinión
    opinionTextarea.value = ''; // Limpiar el campo de texto
    ratingInput.value = ''; // Limpiar la calificación seleccionada
    resetStars(); // Restablecer las estrellas
  }
});

// Función para eliminar comentarios
function deleteComment(deleteBtn) {
  const comment = deleteBtn.closest('.comment');
  comment.remove();
}
