// Existing HTML element
const bucketListEl = document.querySelector('#bucketLists');

// Empty arrays for all activities (bucket list items)
let travel = [];
let adventures = [];
let learning = [];
let hobbies = [];

let activities = [
    { category: "Resor", items: travel },
    { category: "Äventyr", items: adventures },
    { category: "Lärande", items: learning },
    { category: "Hobby", items: hobbies }
];

// Elements in the form
const activityNameEl = document.getElementById('activityName');
const activityCategoryEl = document.getElementById('activityCategory');

// Function to render all activities in the DOM
function renderActivities() {
    bucketListEl.innerHTML = ""; // Clear previous content

    activities.forEach((categoryGroup) => {
        if (categoryGroup.items.length === 0) return; // Skip empty categories

        // Create a section with title for each category
        const categorySection = document.createElement('section');
        const categoryTitle = document.createElement('h2');
        categoryTitle.textContent = categoryGroup.category;
        categorySection.appendChild(categoryTitle);

        // Create a list for the activities in the categories
        const activityList = document.createElement('ul');

        categoryGroup.items.forEach((activity) => {
            const activityItem = document.createElement('li');
            activityItem.textContent = activity.name;

            // Add checkbox to mark activity as complete
            const checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');
            checkbox.checked = activity.completed || false;
            checkbox.addEventListener('change', () => {
                activity.completed = checkbox.checked; // Update item status
                activityItem.style.textDecoration = activity.completed ? "line-through" : "none";
            });
            activityItem.prepend(checkbox);

            // Add remove button
            const removeBtn = document.createElement('button');
            removeBtn.setAttribute('id', 'remove-btn');
            removeBtn.addEventListener('click', () => {
                // Remove item from category
                const index = categoryGroup.items.indexOf(activity);
                if (index > -1) {
                    categoryGroup.items.splice(index, 1);
                }

                // Update DOM
                renderActivities();
            });
            activityItem.appendChild(removeBtn);

            // Add item to list
            activityList.appendChild(activityItem);
        });

        // Add list to section
        categorySection.appendChild(activityList);

        // Add section to the main list
        bucketListEl.appendChild(categorySection);
    });
}

// Function for clicking submit in the form
const bucketForm = document.getElementById('bucketForm');
bucketForm.addEventListener('submit', (event) => {
    // Prevent page from reloading
    event.preventDefault();

    // Create an activity object
    const activity = {
        name: activityNameEl.value.trim(),
        category: activityCategoryEl.value,
        completed: false, // Default value
    };

    // Add activity to correct category array
    if (activity.category === "Resor") {
        travel.push(activity);
    } else if (activity.category === "Äventyr") {
        adventures.push(activity);
    } else if (activity.category === "Lärande") {
        learning.push(activity);
    } else {
        hobbies.push(activity);
    }

    // Render activities
    renderActivities();

    // Reset form
    activityNameEl.value = "";
    activityCategoryEl.value = "Resor";
});