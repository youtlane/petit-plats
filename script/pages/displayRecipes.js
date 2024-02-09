export function displayRecipes(recipesData) {
    const recipesContainer = document.querySelector('.main_content');
    recipesContainer.innerHTML = '';

    recipesData.forEach(recipe => {
        let sectionIngredient = '<div class="ingredient_content">';

        recipe.ingredients.forEach(ingredient => {
            sectionIngredient += `<div class="ingredient">
                <h2>${ingredient.ingredient}</h2>
                <h3>${ingredient.quantity} ${ingredient.unit}</h3>
            </div>`;
        });

        sectionIngredient += '</div>'

        const listItem = `<div class="card">
                <img src="assets/photos/${recipe.image}" alt="" class="card__pic">
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
}