

// Goal: add default focus to the name field

// access name field
const nameField = document.getElementById('name');
// draw focus to the name field
nameField.focus();


//Goal:  Hiding the other-job-roles inputbox

// access the other-job-inputbox
const otherJobField = document.getElementById('other-job-role');
// set the inputbox display prop to none
otherJobField.style.display = 'none';


/* Goal: Program the "Job Role" <select> element to listen for user changes. 
When a change is detected, display/hide the "text field" based on the user’s 
selection in the drop down menu. */

// access the div with the id of basic-info-and-shirt-box
const jobRoles = document.getElementById('title');
// create a eventlistener for changes
jobRoles.addEventListener('change', (e) => {
    // check if the target has the tagname select
    if (e.target.tagName === "SELECT" && e.target.value === "other") {
        otherJobField.style.display = 'inherit';
    } else {
        otherJobField.style.display = 'none';
    }
});


/* Goal: The options in the "Color" drop down menu are not available for each t-shirt design. 
So the user shouldn’t be able to see or choose a color option until they have chosen a design.*/


// access the design dropdown menu
const designField = document.getElementById('design');
// access the color dropdown menu
const colorField = document.getElementById('color');
// if the value equals Select Theme
if (designField.value === 'Select Theme') {
    // disable colorField
    colorField.disabled = true;
}

designField.addEventListener('change', (e) => {
    // iterate over color's children
    for (let i = 1; i < colorField.children.length; i++) {
        let colorOption = colorField.children[i];
        // if design's value equals theme js puns && if child has a class name of heart js
        if (designField.value === 'js puns') {
            // enable colorField
            colorField.disabled = false;
            // set display to inherit
            colorOption.style.display = "inherit";
            if (colorOption.dataset.theme === 'heart js') {
                 // set display to none
                colorOption.style.display = "none";
            }
        // else if design's value equals theme heart js && if child has a class name of js puns
        } else if (designField.value === 'heart js') {
            // enable colorField
            colorField.disabled = false;
            // set display to inherit
            colorOption.style.display = "inherit";

            if (colorOption.dataset.theme === 'js puns') {
                // set display to none
                colorOption.style.display = "none";
            }
        }
    }
});

/* Goal: The "Total: $" element below the "Register for Activities" 
section should update to reflect the sum 
of the cost of the user’s selected activities.*/

// HELPER FUNCTIONS

// get price of activity

function getPrice(input) {
    const price = input.dataset.cost;
    return price;
}

// get time of activity

function getTime(input) {
    const time = input.dataset.dayAndTime;
    return time;
}

// access the fieldset element with the id of activities
const activitiesFieldset = document.getElementById("activities");
// access the activities box within the fieldset
const activitiesBox = document.getElementById("activities-box");
// access the p element for the price total of the activities
const totalElement = document.getElementById('activities-cost');
// set price to 0;
let price = 0;

// create event listener on the activities ele to listener for changes in the checkbox
activitiesFieldset.addEventListener("change", (e) => {
    // save target as target input
    const targetInput = e.target;
    // iterate over activitesBox children -- all labels
    for (let i = 0; i < activitiesBox.children.length; i++) {
        // save as currentFirstChild; access each label's first child
        const currentInput = activitiesBox.children[i].firstElementChild;
        if (targetInput !== currentInput) {
            // check if current and target have the same time
            if (getTime(targetInput) === getTime(currentInput)) {
                // true? disable current
                currentInput.disabled = true;
            }
        }
    }
    // check if the checkbox is checked
    if (targetInput.checked) {
        price += +getPrice(targetInput);
        totalElement.textContent = `Total: $${price}`;
        // getTime(targetInput);
    } else if (!targetInput.checked) {
        price -= +getPrice(targetInput);
        totalElement.textContent = `Total: $${price}`
    }
});

