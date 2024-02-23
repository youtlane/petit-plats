import { displayRecipes } from "./displayRecipes.js";


export function filterRecipes(allRecipes) {
  let recipesData = allRecipes;

  // Récupération des tags déjà selectionnés
  let selectedUtensils =
    JSON.parse(sessionStorage.getItem("selectedUtensils")) || [];

  let selectedAppliances =
    JSON.parse(sessionStorage.getItem("selectedAppliances")) || [];

  let selectedIngredients =
    JSON.parse(sessionStorage.getItem("selectedIngredients")) || [];

  // concaténation de tous ces tags dans un seul tableau selectedTags
  let selectedTags = selectedUtensils.concat(
    selectedAppliances,
    selectedIngredients
  );

  // filtrer la liste des recettes par tags selectedTags
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

function getFilteredRecipes(recipesData, selectedUtensils, selectedAppliances, selectedIngredients) {
  // Filtrer les recettes en fonction des ustensiles sélectionnés

  let filteredByUtensils = recipesData.filter((recipe) => {
    const recipeUstensils = recipe.ustensils || [];

    let allUtensilsIncluded = selectedUtensils.every((tag) =>
      recipeUstensils.includes(tag)
    );
    return allUtensilsIncluded;
  });

  let filteredByAppliances = filteredByUtensils;
  if (selectedAppliances.length > 0) {
    // Filtrer les recettes en fonction des appareils sélectionnés
    filteredByAppliances = filteredByUtensils.filter(
      (recipe) => recipe.appliance === selectedAppliances[0]
    );
  }

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

  return filteredRecipes;
}


export function filterAll(searchValue, recipesData) {
  // Filtering based on selected ingredients and search term
  let filtredRecipes = recipesData.filter((recipe) => {
    let recipeNameIncluded = recipe.name.toLowerCase().includes(searchValue);
    let descriptionIncluded = recipe.description.toLowerCase().includes(searchValue);
    let appliancesIncluded = recipe.appliance.toLowerCase().includes(searchValue);
    let utensilsIncluded = recipe.ustensils.includes(searchValue);
    let ingredientsIncluded = recipe.ingredients.some((ingredient) =>
      ingredient.ingredient.toLowerCase().includes(searchValue)
    );
    return ingredientsIncluded || recipeNameIncluded || descriptionIncluded || appliancesIncluded || utensilsIncluded;
  });
  displayRecipes(filtredRecipes);
}

export function filterAppliances() {
  filterItems(".search-small-a", ".clear-tags-a", ".dropdown__items-a");
}

export function filterIngredients() {
  filterItems(".search-small-i", ".clear-tags-i", ".dropdown__items-i");
}

export function filterUstensils() {
  filterItems(".search-small-u", ".clear-tags-u", ".dropdown__items-u");
}

function filterItems(searchInputSelector, clearTagsSelector, dropdownItemsSelector) {
  const searchInput = document.querySelector(searchInputSelector);
  const searchValue = searchInput.value.toLowerCase();

  manageResetInputButton(clearTagsSelector, searchValue)

  const dropdownItems = document.querySelector(dropdownItemsSelector);
  const itemsList = Array.from(dropdownItems.querySelectorAll("li"));

  itemsList.forEach((item) => {
    const itemText = item.textContent.toLowerCase();
    const isVisible = itemText.includes(searchValue);
    item.style.display = isVisible ? "block" : "none";
  });
}

function manageResetInputButton(clearTagsSelector, searchValue) {
  const resetInput = document.querySelector(clearTagsSelector);

  if (searchValue === '') {
    resetInput.style.display = "none";
  } else {
    resetInput.style.display = "block";
  }
}

export function resetAppliances() {
  const searchInput = document.querySelector(".search-small-a");
  searchInput.value = '';
  filterAppliances();
}

export function resetIngredients() {
  const searchInput = document.querySelector(".search-small-i");
  searchInput.value = '';
  filterIngredients();
}

export function resetUstensils() {
  const searchInput = document.querySelector(".search-small-u");
  searchInput.value = '';
  filterUstensils();
}
