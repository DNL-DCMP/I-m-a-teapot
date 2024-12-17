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
      ratingInput.value = idx + 1; 
  
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
      resetStars();
      highlightStars(index + 1);  
    });
  
    star.addEventListener('mouseleave', () => {
      // Restaurar el color de las estrellas cuando el ratón sale
      resetStars();
      highlightStars(ratingInput.value); 
    });
  
    star.addEventListener('click', () => {
      // Establecer la calificación en el input oculto cuando se hace clic
      ratingInput.value = index + 1;
      resetStars();
      highlightStars(index + 1);  
    });
  });
  
  // Función para resaltar las estrellas al pasar el ratón
  function highlightStars(count) {
    stars.forEach((star, index) => {
      if (index < count) {
        star.classList.add('selected');
        star.classList.replace('bx-star', 'bxs-star');
      } else {
        star.classList.remove('selected');
        star.classList.replace('bxs-star', 'bx-star');
      }
    });
  }
  
  // Función para restablecer las estrellas (quitar el color de las estrellas)
  function resetStars() {
    stars.forEach(star => {
      star.classList.remove('hover', 'selected');
      star.classList.replace('bxs-star', 'bx-star');
    });
  }
  
  // Función para crear un comentario
  function createComment(rating, opinion) {
    const comment = document.createElement('div');
    comment.classList.add('comment');
  

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
  
    // Asegura que el comentario no esté vacío y que haya una calificación seleccionada
    if (opinion !== '' && ratingInput.value !== '') {
      const rating = parseInt(ratingInput.value, 10);  
      createComment(rating, opinion);  
      opinionTextarea.value = ''; 
      ratingInput.value = ''; 
      resetStars(); 
    }
  });
  
  // Función para eliminar comentarios
  function deleteComment(deleteBtn) {
    const comment = deleteBtn.closest('.comment');
    comment.remove();
  }

// Obtener el botón de cancelar
const cancelBtn = document.querySelector('.btn.cancel');

// Agregar el manejador de eventos para el botón cancelar
cancelBtn.addEventListener('click', function() {
  // Limpiar el campo de texto de la opinión
  opinionTextarea.value = '';

  // Restablecer las estrellas
  ratingInput.value = '';  // Limpiar la calificación seleccionada
  resetStars();  // Llamar a la función para restablecer las estrellas

  // Opcionalmente, puedes también agregar algún comportamiento visual o mensaje de confirmación
});


  // Función para restablecer las estrellas (quitar el color de las estrellas)
function resetStars() {
    stars.forEach(star => {
      star.classList.remove('hover', 'selected');  // Eliminar clases de selección y hover
      star.classList.replace('bxs-star', 'bx-star');  // Asegurarse de que todas las estrellas sean vacías
    });
  }