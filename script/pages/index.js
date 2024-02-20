import { GetData } from "../services/GetData.js";
import { displayRecipes } from "./displayRecipes.js";
import { addTags, displayTags } from "./displayTags.js";
import {
  filterRecipes,
  filterUstensils,
  filterIngredients,
  filterAppliances,
  filterAll,
  resetAppliances,
  resetIngredients,
  resetUstensils
} from "./filterRecipes.js";

const dataService = new GetData();
let allRecipes = [];
let recipesData = [];
let allIngredients = [];
let allAppliances = [];
let allUstensils = [];


async function init() {
  recipesData = await dataService.getRecipesData();
  allRecipes = recipesData;

  // Afficher les tags dejà selectionnés
  displayTags();

  // filtrer par tags selectionnés et afficher les recettes
  filterAndDisplayRecipes();

  // Ajouter des écouteurs d'événements 
  addListners()
}

function initTagsData(recipesData) {
  allIngredients = Array.from(
    new Set(
      recipesData.flatMap((recipe) =>
        recipe.ingredients.map((ingredient) => ingredient.ingredient)
      )
    )
  );

  allAppliances = Array.from(
    new Set(recipesData.map((recipe) => recipe.appliance))
  );
  allUstensils = Array.from(
    new Set(recipesData.flatMap((recipe) => recipe.ustensils))
  );


  displayIngredients();
  displayAppliances();
  displayUstensils();
}

function addListners() {
  // Ajouter des écouteurs d'événements pour basculer la visibilité du dropdown
  const buttonDownI = document.getElementById("button__down-i");
  const buttonUpI = document.getElementById("button__up-i");
  buttonDownI.addEventListener("click", toggleDropdown.bind(null, "i"));
  buttonUpI.addEventListener("click", toggleDropdown.bind(null, "i"));

  const buttonDownA = document.getElementById("button__down-a");
  const buttonUpA = document.getElementById("button__up-a");
  buttonDownA.addEventListener("click", toggleDropdown.bind(null, "a"));
  buttonUpA.addEventListener("click", toggleDropdown.bind(null, "a"));

  const buttonDownU = document.getElementById("button__down-u");
  const buttonUpU = document.getElementById("button__up-u");
  buttonDownU.addEventListener("click", toggleDropdown.bind(null, "u"));
  buttonUpU.addEventListener("click", toggleDropdown.bind(null, "u"));

  const searchInputU = document.querySelector(".search-small-u");
  searchInputU.addEventListener("input", filterUstensils);

  const searchInputA = document.querySelector(".search-small-a");
  searchInputA.addEventListener("input", filterAppliances);

  const searchInputI = document.querySelector(".search-small-i");
  searchInputI.addEventListener("input", filterIngredients);

  const searchInput = document.querySelector(".search");
  searchInput.addEventListener("input", () => {
    filterAll(searchInput.value.toLowerCase(), recipesData);
  });


  const searchResetU = document.querySelector(".clear-tags-u");
  searchResetU.addEventListener("click", resetUstensils);

  const searchResetA = document.querySelector(".clear-tags-a");
  searchResetA.addEventListener("click", resetAppliances);

  const searchResetI = document.querySelector(".clear-tags-i");
  searchResetI.addEventListener("click", resetIngredients);
}

function displayIngredients() {
  const dropdownItemsI = document.querySelector(".dropdown__items-i");
  dropdownItemsI.innerHTML = "";
  
  allIngredients.forEach((ingredient) => {
    const listItem = document.createElement("li");
    listItem.textContent = ingredient;
    listItem.classList.add("search-item");
    dropdownItemsI.appendChild(listItem);

    addReciepesEvent("selectedIngredients", listItem);
  });
}

function displayAppliances() {
  const dropdownItemsA = document.querySelector(".dropdown__items-a");
  dropdownItemsA.innerHTML = "";

  allAppliances.forEach((appliance) => {
    const listItem = document.createElement("li");
    listItem.textContent = appliance;
    listItem.classList.add("search-item");
    dropdownItemsA.appendChild(listItem);

    addReciepesEvent("selectedAppliances", listItem);
  });
}

function displayUstensils() {
  const dropdownItemsU = document.querySelector(".dropdown__items-u");
  dropdownItemsU.innerHTML = "";

  allUstensils.forEach((ustensil) => {
    const listItem = document.createElement("li");
    listItem.textContent = ustensil;
    listItem.classList.add("search-item");
    dropdownItemsU.appendChild(listItem);

    addReciepesEvent("selectedUtensils", listItem);
  });
}

function addReciepesEvent(selectedTagsName, listItems) {
  listItems.addEventListener("click", () => {
    const value = listItems.textContent;
    addTags(selectedTagsName, value);

    filterAndDisplayRecipes();
  });
}

function filterAndDisplayRecipes() {
  recipesData = filterRecipes(allRecipes);
  const titleHeader = document.querySelector('.header-title');

  // Now you can use the filteredRecipes to display in the UI
  displayRecipes(recipesData);
  titleHeader.innerHTML = recipesData.length + ' recettes';

  toggleDropdownAll();
  initTagsData(recipesData);
}

function toggleDropdown(dropdownType) {
  const dropdownBodyI = document.querySelector(".dropdown__body-i");
  const dropdownBodyA = document.querySelector(".dropdown__body-a");
  const dropdownBodyU = document.querySelector(".dropdown__body-u");

  const buttonUpI = document.getElementById("button__up-i");
  const buttonDownI = document.getElementById("button__down-i");

  const buttonUpA = document.getElementById("button__up-a");
  const buttonDownA = document.getElementById("button__down-a");

  const buttonUpU = document.getElementById("button__up-u");
  const buttonDownU = document.getElementById("button__down-u");

  // Afficher le dropdown en cours
  const currentButtonUp = dropdownType === "i" ? buttonUpI : dropdownType === "a" ? buttonUpA : buttonUpU;
  const currentButtonDown =
    dropdownType === "i"
      ? buttonDownI
      : dropdownType === "a"
      ? buttonDownA
      : buttonDownU;
  const currentDropdownBody =
    dropdownType === "i"
      ? dropdownBodyI
      : dropdownType === "a"
      ? dropdownBodyA
      : dropdownBodyU;

  if (
    currentDropdownBody.style.display === "none" ||
    currentDropdownBody.style.display === ""
  ) {
    currentButtonUp.style.display = "none";
    currentButtonDown.style.display = "block";
    displayDropdowns(dropdownType, dropdownBodyI, dropdownBodyA, dropdownBodyU);
  } else {
    currentButtonUp.style.display = "block";
    currentButtonDown.style.display = "none";
    currentDropdownBody.style.display = "none";
  }
}

function displayDropdowns(dropdownType, dropdownBodyI, dropdownBodyA, dropdownBodyU) {
  if (dropdownType === "i") {
    dropdownBodyI.style.display = "block";
    dropdownBodyA.style.display = "none";
    dropdownBodyU.style.display = "none";
  } else if (dropdownType === "a") {
    dropdownBodyI.style.display = "none";
    dropdownBodyA.style.display = "block";
    dropdownBodyU.style.display = "none";
  } else {
    dropdownBodyI.style.display = "none";
    dropdownBodyA.style.display = "none";
    dropdownBodyU.style.display = "block";
  }
}

function toggleDropdownAll() {
  const dropdownBodyI = document.querySelector(".dropdown__body-i");
  const dropdownBodyA = document.querySelector(".dropdown__body-a");
  const dropdownBodyU = document.querySelector(".dropdown__body-u");

  dropdownBodyI.style.display = "none";
  dropdownBodyA.style.display = "none";
  dropdownBodyU.style.display = "none";
}

export function removeTagFromSession(tagToRemove, tagType) {
  if (tagType === "selectedUtensils") {
    let selectedTags =
      JSON.parse(sessionStorage.getItem("selectedUtensils")) || [];

    // Remove the specified tag from the array
    selectedTags = selectedTags.filter((tag) => tag !== tagToRemove);

    // Update the session with the modified array
    sessionStorage.setItem("selectedUtensils", JSON.stringify(selectedTags));
  } else if (tagType === "selectedAppliances") {
    let selectedTags =
      JSON.parse(sessionStorage.getItem("selectedAppliances")) || [];

    // Remove the specified tag from the array
    selectedTags = selectedTags.filter((tag) => tag !== tagToRemove);

    // Update the session with the modified array
    sessionStorage.setItem("selectedAppliances", JSON.stringify(selectedTags));
  } else if (tagType === "selectedIngredients") {
    let selectedTags =
      JSON.parse(sessionStorage.getItem("selectedIngredients")) || [];

    // Remove the specified tag from the array
    selectedTags = selectedTags.filter((tag) => tag !== tagToRemove);

    // Update the session with the modified array
    sessionStorage.setItem("selectedIngredients", JSON.stringify(selectedTags));
  }

  filterAndDisplayRecipes();
}

init();
