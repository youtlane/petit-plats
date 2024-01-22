import { GetData } from "../services/GetData.js";

const dataService = new GetData();
let recipesData = [];
let allIngredients = [];
let allAppliances = [];
let allUstensils = [];

async function init() {
    recipesData = await dataService.getRecipesData();
    allIngredients = Array.from(new Set(recipesData.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient))));
    allAppliances = Array.from(new Set(recipesData.map(recipe => recipe.appliance)));
    allUstensils = Array.from(new Set(recipesData.flatMap(recipe => recipe.ustensils)));

    
    displayIngredients();
    displayAppliances();
    displayUstensils();


    // Ajouter des écouteurs d'événements pour basculer la visibilité du dropdown
    const buttonDownI = document.getElementById('button__down-i');
    const buttonUpI = document.getElementById('button__up-i');
    buttonDownI.addEventListener('click', toggleDropdown.bind(null, 'i'));
    buttonUpI.addEventListener('click', toggleDropdown.bind(null, 'i'));

    const buttonDownA = document.getElementById('button__down-a');
    const buttonUpA = document.getElementById('button__up-a');
    buttonDownA.addEventListener('click', toggleDropdown.bind(null, 'a'));
    buttonUpA.addEventListener('click', toggleDropdown.bind(null, 'a'));

    const buttonDownU = document.getElementById('button__down-u');
    const buttonUpU = document.getElementById('button__up-u');
    buttonDownU.addEventListener('click', toggleDropdown.bind(null, 'u'));
    buttonUpU.addEventListener('click', toggleDropdown.bind(null, 'u'));

}

function displayIngredients() {
    const dropdownItems = document.querySelector('.dropdown__items-i');

    // Create and append list items
    allIngredients.forEach(ingredient => {
        const listItem = document.createElement('li');
        listItem.textContent = ingredient;
        dropdownItems.appendChild(listItem);
    });

}

function displayAppliances() {
    const dropdownItemsA = document.querySelector('.dropdown__items-a');

    // Créer et ajouter des éléments de liste
    allAppliances.forEach(appliance => {
        const listItem = document.createElement('li');
        listItem.textContent = appliance;
        dropdownItemsA.appendChild(listItem);
    });
}

function displayUstensils() {
    const dropdownItemsU = document.querySelector('.dropdown__items-u');

    // Créer et ajouter des éléments de liste
    allUstensils.forEach(ustensil => {
        const listItem = document.createElement('li');
        listItem.textContent = ustensil;
        dropdownItemsU.appendChild(listItem);
    });
}
function toggleDropdown(dropdownType) {
    const dropdownBodyI = document.querySelector('.dropdown__body-i');
    const dropdownBodyA = document.querySelector('.dropdown__body-a');
    const dropdownBodyU = document.querySelector('.dropdown__body-u');

    const buttonUpI = document.getElementById('button__up-i');
    const buttonDownI = document.getElementById('button__down-i');

    const buttonUpA = document.getElementById('button__up-a');
    const buttonDownA = document.getElementById('button__down-a');

    const buttonUpU = document.getElementById('button__up-u');
    const buttonDownU = document.getElementById('button__down-u');


    // Afficher le dropdown en cours
    const currentButtonUp = dropdownType === 'i' ? buttonUpI : (dropdownType === 'a' ? buttonUpA : buttonUpU);
    const currentButtonDown = dropdownType === 'i' ? buttonDownI : (dropdownType === 'a' ? buttonDownA : buttonDownU);
    const currentDropdownBody = dropdownType === 'i' ? dropdownBodyI : (dropdownType === 'a' ? dropdownBodyA : dropdownBodyU);

    if (currentDropdownBody.style.display === 'none' || currentDropdownBody.style.display === '') {
        currentButtonUp.style.display = 'none';
        currentButtonDown.style.display = 'block';
        currentDropdownBody.style.display = 'block';
    } else {
        currentButtonUp.style.display = 'block';
        currentButtonDown.style.display = 'none';
        currentDropdownBody.style.display = 'none';
    }
}


init();