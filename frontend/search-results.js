document.addEventListener('DOMContentLoaded', () => {
    const resultsContainer = document.querySelector('container-results');
    const searchResults = JSON.parse(localStorage.getItem('searchResults'));

    if (searchResults && searchResults.length > 0) {
        searchResults.forEach(recipe => {
            const recipeElement = document.createElement('div');
            recipeElement.className = 'recipe';
            recipeElement.innerHTML = `
                <h2>${recipe.name}</h2>
                <p>${recipe.description}</p>
            `;
            resultsContainer.appendChild(recipeElement);
        });
    } else {
        resultsContainer.innerHTML = '<p>No se encontraron recetas.</p>';
    }
});