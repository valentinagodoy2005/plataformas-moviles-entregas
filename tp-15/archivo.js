document.addEventListener("DOMContentLoaded", () => {
    const recipeGrid = document.getElementById("recipeGrid");
    const spinner = document.getElementById("spinner");
    
    document.getElementById("chineseBtn").addEventListener("click", () => fetchRecipes('Chinese'));
    document.getElementById("italianBtn").addEventListener("click", () => fetchRecipes('Italian'));
    document.getElementById("americanBtn").addEventListener("click", () => fetchRecipes('American'));

    function fetchRecipes(cuisine) {
        recipeGrid.innerHTML = '';
        spinner.style.display = 'block';

        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}`)
            .then(response => response.json())
            .then(data => {
                displayRecipes(data.meals);
                spinner.style.display = 'none';
            })
            .catch(error => console.error('Error fetching recipes:', error));
    }

    function displayRecipes(recipes) {
        recipeGrid.innerHTML = recipes.map(recipe => `
            <div class="col-md-4">
                <div class="card recipe-card">
                    <img src="${recipe.strMealThumb}" class="card-img-top recipe-img" alt="${recipe.strMeal}">
                    <div class="card-body">
                        <h5 class="card-title">${recipe.strMeal}</h5>
                        <button class="btn btn-info" onclick="fetchRecipeDetails('${recipe.idMeal}')">Ver más</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    window.fetchRecipeDetails = function (idMeal) {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
            .then(response => response.json())
            .then(data => {
                const meal = data.meals[0];
                alert(`
                    Nombre: ${meal.strMeal}
                    Descripción: ${meal.strInstructions}
                    Ingredientes: ${meal.strIngredient1}, ${meal.strIngredient2}, ...
                    Pasos: ${meal.strInstructions}
                `);
            })
            .catch(error => console.error('Error fetching recipe details:', error));
    };
});
