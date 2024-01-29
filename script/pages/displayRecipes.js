export function displayRecipes(recipesData) {
    const recipesContainer = document.querySelector('.main_content');

    recipesData.forEach(recipe => {
        let sectionIngredient = '<table>';

        recipe.ingredients.forEach(ingredient => {
            sectionIngredient += `<tr>
                <td>${ingredient.ingredient}</td>
                <td>${ingredient.quantity} ${ingredient.unit}</td>
            </tr>`;
        });

        sectionIngredient += '</table>'

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