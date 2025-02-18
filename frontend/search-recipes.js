document.addEventListener('DOMContentLoaded', () => {
    const searchIcon = document.getElementById('search-box-icon');
    const searchInput = document.querySelector('.search-box-input');

    function setCookie(name, value, maxAge) {
        document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}`;
    }

    searchIcon.addEventListener('click', async () => {
        const query = searchInput.value.toLowerCase();
        if (query) {
            try {
                const response = await fetch('http://localhost:3000/api/v1/recipes');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                // Filtrar las recetas según el término de búsqueda
                const filteredRecipes = data.filter(recipe => 
                    recipe.name.toLowerCase().includes(query) ||
                    recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(query)) || 
                    recipe.categories.some(category => category.toLowerCase().includes(query))
                );
                
                // Almacenar los resultados en una cookie para acceder a ellos en la página de resultados
                setCookie('searchResults', JSON.stringify(filteredRecipes), 3600); // Expira en 1 hora
                window.location.href = 'search-results.html';
            } catch (error) {
                console.error('Error fetching search results:', error);
                alert('Hubo un problema al obtener los resultados de búsqueda. Por favor, inténtelo de nuevo.');
            }
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