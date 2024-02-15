export function displayRecipes(recipesData) {
    const recipesContainer = document.querySelector('.main_content');
    recipesContainer.innerHTML = '';

    if (recipesData.length > 0) {
        recipesData.forEach(recipe => {
            let sectionIngredient = '<div class="ingredient_content">';

            recipe.ingredients.forEach(ingredient => {
                sectionIngredient += `<div class="ingredient">
                <h2>${ingredient.ingredient}</h2>
                <h3>${ingredient.quantity ? ingredient.quantity : ''} ${ingredient.unit ? ingredient.unit : ''}</h3>
            </div>`;
            });

            sectionIngredient += '</div>'

            const listItem = `<div class="card">
                <p class='recipe-time'>${recipe.time} min</p>
                <img src="assets/photos/${recipe.image}" alt="recipe image" class="card__pic">
                <div class="card__content">
                    <h2 class="recipe-title">${recipe.name}</h2>
                    <div class="recipe-text">
                        <h3>recette</h3>
                        <p>${recipe.description}</p>
                        <h3>Ingrédients</h3>
                        ${sectionIngredient}
                    </div>
                </div>
            </div>`;
            recipesContainer.insertAdjacentHTML('afterbegin', listItem);
        });
    } else {
        recipesContainer.insertAdjacentHTML('afterbegin',
            "<div class='empty-recipes'>Aucune recette avec ces paramètres n'a été trouvée.</div>");
    }
}