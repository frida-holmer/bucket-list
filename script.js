console.log(document);
// spara undan befintligt HTML-element
const bucketListEl = document.querySelector('#bucketLists');

// tom array för alla aktiviteter
let activities = [];

// element i formuläret
const activityNameEl = document.getElementById('activityName');

const activityCategoryEl = document.getElementById('activityCategory');

// funktion för att skriva ut aktivitet i HTML
function renderActivity(activity) {
    const listItemEl = document.createElement('li'); // skapa nytt element, ej inlagd på DOM
    listItemEl.innerHTML = `${activityNameEl.value} Kategori: ${activityCategoryEl.value}`;
    bucketListEl.appendChild(listItemEl); // lägg in nytt element på DOM (förankra i befintligt HTML-element)
}

// funktion för när vi trycker på submit i formuläret
const bucketForm = document.getElementById('bucketForm');
bucketForm.addEventListener('submit', (event) => {
    // förhindra att sidan laddas om
    event.preventDefault();

    // skapa ett objekt
    const activity = {
        name: activityNameEl.value.trim(),
        category: activityCategoryEl.value,
    };

    // lägg in objekt i array
    activities.push(activity);
    console.log(activities);

    // lägg in objekt i HTML (trigga funktion)
    renderActivity(activity);

    // återställ formuläret
    activityNameEl.value = "";
    activityCategoryEl.value = "Resor";
});