import { removeTagFromSession } from "./index.js";

export function addTags(tagName, tagValue) {
  // Retrieve the existing array of selected utensils from the session
  let selectedUtensils = JSON.parse(sessionStorage.getItem(tagName)) || [];

  // Check if the selected utensil is not already in the array
  if (!selectedUtensils.includes(tagValue)) {
    // Add the selected utensil to the array
    selectedUtensils.push(tagValue);
    // Store the updated array in the session
    sessionStorage.setItem(tagName, JSON.stringify(selectedUtensils));
  }

  displayTags();
}

export function displayTags() {
  const tagRecipes = document.querySelector(".tags-recipes");

  // Récupération des tags selectionnés depuis la session du navigateur
  let selectedIngredients =
    JSON.parse(sessionStorage.getItem("selectedIngredients")) || [];
  let selectedAppliances =
    JSON.parse(sessionStorage.getItem("selectedAppliances")) || [];
  let selectedUtensils =
    JSON.parse(sessionStorage.getItem("selectedUtensils")) || [];

  let tags = "";

  // Ajout des tags selectionnées dans des elements HTML
  selectedIngredients.forEach((tag) => {
    tags += `<span class="tags" id="${tag}" tag-type="selectedIngredients" role="button">
                    ${tag}
                    <i class="fa fa-times" aria-hidden="true"></i>
                </span>`;
  });
  selectedAppliances.forEach((tag) => {
    tags += `<span class="tags" id="${tag}" tag-type="selectedAppliances" role="button">
                    ${tag}
                    <i class="fa fa-times" aria-hidden="true"></i>
                </span>`;
  });
  selectedUtensils.forEach((tag) => {
    tags += `<span class="tags" id="${tag}" tag-type="selectedUtensils" role="button">
                    ${tag}
                    <i class="fa fa-times" aria-hidden="true"></i>
                </span>`;
  });

  // Insérer les elements tags dans l'element tagRecipes
  tagRecipes.innerHTML = "";
  tagRecipes.insertAdjacentHTML("afterbegin", tags);

  // Add click event listener to the container
  tagRecipes.addEventListener("click", handleTagClick);
}

function handleTagClick(event) {
  const clickedElement = event.target;

  // Check if the clicked element is a  close icon
  if (clickedElement.classList.contains("fa-times")) {
    // If the close icon was clicked, find the corresponding tag and remove it
    const clickedTag = clickedElement.closest(".tags").textContent.trim();
    const tagType = clickedElement.closest(".tags").getAttribute("tag-type");

    // Remove the clicked tag from the session
    removeTagFromSession(clickedTag, tagType);

    // Re-display tags after removal
    displayTags();
  }
}
