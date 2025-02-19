const apiUrl = process.env.API_URL || "http://localhost:3000";

document.addEventListener('DOMContentLoaded', () => {
    const searchIcon = document.getElementById('search-box-icon');
    const searchInput = document.querySelector('.search-box-input');

    searchIcon.addEventListener('click', async () => {
        const query = searchInput.value.toLowerCase();
        if (query) {
            fetch (`http://${apiUrl}/api/v1/recipes`)
            .then(response => response.json())
            .then(data => {
                // Filtrar las recetas según el término de búsqueda
                const filteredRecipes = data.filter(recipe => 
                    recipe.name.toLowerCase().includes(query) ||
                    recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(query)) || 
                    recipe.categories.some(category => category.toLowerCase().includes(query))
                );
                
                // Almacenar los resultados en una localStorage para acceder a ellos en la página de resultados
                localStorage.setItem('searchResults', JSON.stringify(filteredRecipes));
                window.location.href = 'search-results.html';
            });
        } else {
            alert('Por favor, ingrese un término de búsqueda.');
        }
    });

    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            searchIcon.click();
        }
    });
});