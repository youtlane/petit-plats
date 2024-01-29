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
    let tags= '';

    selectedTags.forEach(tag => {
        tags += `<span>${tag}</span>`;
    });

    tagRecipes.insertAdjacentHTML('afterbegin', tags);
}