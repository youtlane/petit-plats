// Fonction pour afficher les recettes dans le contenu HTML
export function displayRecipes(recipesData) {
    // Sélectionner les éléments du DOM
    const recipesContainer = document.querySelector('.main_content');
    const titleHeader = document.querySelector('.header-title');

    // Vider le contenu HTML du conteneur des recettes
    recipesContainer.innerHTML = '';

    // Vérifier s'il y a des recettes à afficher
    if (recipesData.length > 0) {
        // Parcourir chaque recette dans le tableau
        recipesData.forEach(recipe => {
            // Initialiser une chaîne pour contenir les sections d'ingrédients
            let sectionIngredient = '<div class="ingredient_content">';

            // Pour chaque ingrédient de la recette, ajouter une section d'ingrédient
            recipe.ingredients.forEach(ingredient => {
                sectionIngredient += `<div class="ingredient">
                    <h2>${ingredient.ingredient}</h2>
                    <h3>${ingredient.quantity ? ingredient.quantity : ''} ${ingredient.unit ? ingredient.unit : ''}</h3>
                </div>`;
            });

            // Fermer la section d'ingrédients
            sectionIngredient += '</div>';

            // Créer une carte pour la recette
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

            // Insérer la carte dans le conteneur des recettes
            recipesContainer.insertAdjacentHTML('afterbegin', listItem);
        });
    } else {
        // Afficher un message si aucune recette n'est trouvée
        recipesContainer.insertAdjacentHTML('afterbegin',
            "<div class='empty-recipes'>Aucune recette avec ces paramètres n'a été trouvée.</div>");
    }

    // Mettre à jour le titre avec le nombre de recettes affichées
    titleHeader.innerHTML = recipesData.length + ' recettes';
}
