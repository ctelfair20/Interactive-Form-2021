

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
// console.log(colorField.dataset.theme);
}

colorField.addEventListener('change', (e) => {
    // iterate over color's children
    for (let i = 0; i < colorField.children.length; i++) {
        colorField.disabled = false;
        console.log(colorField.children[i]);
        // // if design's value equals theme js puns && if child has a class name of heart js
        // if () {
        //     // set display to none
        
        // // else if design's value equals theme heart js && if child has a class name of js puns
        // } else if () {
        //     // set display to none
        // }   
    }
});

