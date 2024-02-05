export function filterRecipes(allRecipes) {
  let recipesData = allRecipes;
  let selectedUtensils =
    JSON.parse(sessionStorage.getItem("selectedUtensils")) || [];

  let selectedAppliances =
    JSON.parse(sessionStorage.getItem("selectedAppliances")) || [];

  let selectedIngredients =
    JSON.parse(sessionStorage.getItem("selectedIngredients")) || [];

  let selectedTags = selectedUtensils.concat(
    selectedAppliances,
    selectedIngredients
  );

  if (selectedTags.length > 0) {
    // Assuming recipesData is a global variable or accessible in this scope
    recipesData = getFilteredRecipes(
      allRecipes,
      selectedUtensils,
      selectedAppliances,
      selectedIngredients
    );
  }
  return recipesData;
}

function getFilteredRecipes(
  recipesData,
  selectedUtensils,
  selectedAppliances,
  selectedIngredients
) {
  // Filtrer les recettes en fonction des ustensiles sélectionnés

  let filteredByUtensils = recipesData.filter((recipe) => {
    const recipeUstensils = recipe.ustensils || [];

    let allUtensilsIncluded = selectedUtensils.every((tag) =>
      recipeUstensils.includes(tag)
    );
    return allUtensilsIncluded;
  });

  console.log("filteredByUtensils", filteredByUtensils);

  let filteredByAppliances = filteredByUtensils;
  if (selectedAppliances.length > 0) {
    // Filtrer les recettes en fonction des appareils sélectionnés
    filteredByAppliances = filteredByUtensils.filter(
      (recipe) => recipe.appliance === selectedAppliances[0]
    );
  }
  console.log("filteredByAppliances", filteredByAppliances);

  let filteredRecipes = filteredByAppliances;
  if (selectedIngredients.length > 0) {
    // Filtrer les recettes qui contiennent les tags spécifiés
    filteredRecipes = filteredByAppliances.filter((recipe) => {
      // Vérifier si au moins un ingrédient de la recette contient un tag
      return recipe.ingredients.some((ingredient) =>
        selectedIngredients.includes(ingredient.ingredient)
      );
    });
  }

  console.log("filteredRecipes", filteredRecipes);

  return filteredRecipes;
}

export function filterAppliances() {
  filterItems(".search-small-a", ".dropdown__items-a");
}

export function filterIngredients() {
  filterItems(".search-small-i", ".dropdown__items-i");
}

export function filterUstensils() {
  filterItems(".search-small-u", ".dropdown__items-u");
}

function filterItems(searchInputSelector, dropdownItemsSelector) {
  const searchInput = document.querySelector(searchInputSelector);
  const searchValue = searchInput.value.toLowerCase();
  const dropdownItems = document.querySelector(dropdownItemsSelector);
  const itemsList = Array.from(dropdownItems.querySelectorAll("li"));

  itemsList.forEach((item) => {
    const itemText = item.textContent.toLowerCase();
    const isVisible = itemText.includes(searchValue);
    item.style.display = isVisible ? "block" : "none";
  });
}
