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
const basicInfoBox = document.getElementsByClassName('basic-info-and-shirt-box')[0];
// create a eventlistener for changes
basicInfoBox.addEventListener('change', (e) => {
    // check if the target has the tagname select
    if (e.target.tagName === "SELECT") {
        if (e.target.value === "other") {
            otherJobField.style.display = 'inherit'
        }
    }
});

