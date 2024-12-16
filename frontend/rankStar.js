const allStar = document.querySelectorAll('.rating .star')
const ratingValue = document.querySelector('.rating input')

allStar.forEach((item, idx)=> {
	item.addEventListener('click', function () {
		let click = 0
		ratingValue.value = idx + 1

		allStar.forEach(i=> {
			i.classList.replace('bxs-star', 'bx-star')
			i.classList.remove('active')
		})
		for(let i=0; i<allStar.length; i++) {
			if(i <= idx) {
				allStar[i].classList.replace('bx-star', 'bxs-star')
				allStar[i].classList.add('active')
			} else {
				allStar[i].style.setProperty('--i', click)
				click++
			}
		}
	})
})
/* // Manejo del formulario para enviar el comentario
document.getElementById('commentForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma tradicional

    const content = document.getElementById('opinion').value;
    const recipeId = document.getElementById('recipeId').value; // no estaria encontrando el id de las recetas

    // Realiza una petición POST a la API de los comentarios
    const response = await fetch(`/recipes/${recipeId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: content
        })
    });

    if (response.ok) {
        alert('Comentario enviado exitosamente');
        document.getElementById('opinion').value = ''; 
    } else {
        alert('Error al enviar el comentario');
    }
});*/