document.addEventListener('DOMContentLoaded', () => {
    const searchIcon = document.getElementById('search-box-icon');
    const searchInput = document.querySelector('.search-box input');

    searchIcon.addEventListener('click', async () => {
        const query = searchInput.value.trim();
        if (query) {
            // const response = await fetch(`http://localhost:3000/api/v1/recipes?search=${encodeURIComponent(query)}`);
            // if (!response.ok) {
            //     throw new Error('Error en la solicitud');
            // }
            // const recipes = await response.json();
            // // Almacenar los resultados en el almacenamiento local para acceder a ellos en la página de resultados
            // localStorage.setItem('searchResults', JSON.stringify(recipes));
            // Redirigir a la página de resultados de búsqueda
            window.location.href = 'search-results.html';
        } else {
            alert('Por favor, ingrese un término de búsqueda.');
        }
    });
});