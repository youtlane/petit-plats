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

        // Log the updated list of selected utensils
        console.log('Selected Utensils:', selectedUtensils);
    }

    displayTags();
}

export function displayTags() {
    const tagRecipes = document.querySelector('.tags-recipes');
    let selectedTags = JSON.parse(sessionStorage.getItem('selectedUtensils')) || [];
    let tags = '';

    selectedTags.forEach(tag => {
        tags += `<span class="tags" id="${tag}" role="button">
                    ${tag}
                    <i class="fa fa-times" aria-hidden="true"></i>
                </span>`;
    });

    tagRecipes.innerHTML = '';
    tagRecipes.insertAdjacentHTML('afterbegin', tags);

    // Add click event listener to the container
    tagRecipes.addEventListener('click', handleTagClick);
}

function handleTagClick(event) {
    const clickedElement = event.target;

    // Check if the clicked element is a tag or its close icon
    if (clickedElement.classList.contains('tags')) {
        const clickedTag = clickedElement.textContent.trim();

        // Remove the clicked tag from the session
        removeTagFromSession(clickedTag);

        // Re-display tags after removal
        displayTags();
    } else if (clickedElement.classList.contains('fa-times')) {
        // If the close icon was clicked, find the corresponding tag and remove it
        const clickedTag = clickedElement.closest('.tags').textContent.trim();

        // Remove the clicked tag from the session
        removeTagFromSession(clickedTag);

        // Re-display tags after removal
        displayTags();
    }
}
