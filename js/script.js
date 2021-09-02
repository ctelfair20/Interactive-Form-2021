

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
                if (targetInput.checked === false) {
                    currentInput.disabled = false;
                } else {
                    currentInput.disabled = true;
                }
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

/* Goal: Program the "I'm going to pay with" <select> element 
to listen for user changes. When a change is detected, 
hide all payment sections in the form’s UI except the selected one. */

paymentMethodsConstants = {
    paymentElement: document.getElementById('payment'),
    creditCardDiv: document.getElementById('credit-card'), 
    paypalDiv: document.getElementById('paypal'),
    bitcoinDiv: document.getElementById('bitcoin')
}

paymentMethodsConstants.paymentElement.value = "credit-card";
paymentMethodsConstants.paypalDiv.style.display = "none";
paymentMethodsConstants.bitcoinDiv.style.display = "none";


// create an event listener for the "I'm going to pay with" <select> element
paymentMethodsConstants.paymentElement.addEventListener("change", (e) => {
    // iterate over paymentMethodsConstants
    for (let prop in paymentMethodsConstants) {
        paymentMethodsConstants[prop].style.display = "inherit"
        if (paymentMethodsConstants.paymentElement.value === "paypal") {
            if (prop !== "paypalDiv" && prop !== "paymentElement") {
                paymentMethodsConstants[prop].style.display = "none";
            }
        } else if (paymentMethodsConstants.paymentElement.value === "bitcoin") {
            if (prop !== "bitcoinDiv" && prop !== "paymentElement") {
                paymentMethodsConstants[prop].style.display = "none";
            }
        } else if (paymentMethodsConstants.paymentElement.value === "credit-card") {
            if (prop !== "creditCardDiv" && prop !== "paymentElement") {
                paymentMethodsConstants[prop].style.display = "none";
            }
        }
    }
});

/* Goal: Program the form element to listen for the submit event.
the "Name" field cannot be blank or empty.

The "Email Address" field must contain a validly formatted email address. 
The email address does not need to be a real email address, just formatted like one. 
For example: 
dave@teamtreehouse.com. A few characters for the username, 
followed by "@", followed by a few more characters and a ".com" for the domain name.
You don’t have to account for other top-level domains, like .org, .net, etc.

The "Register for Activities" section must have at least one activity selected.
If and only if credit card is the selected payment method:
The "Card number" field must contain a 13 - 16 digit credit card number 
with no dashes or spaces.The value does not need to be a real credit card number.
The "Zip code" field must contain a 5 digit number.
The "CVV" field must contain a 3 digit number.*/


// access the form element
const form = document.querySelector("form");
// access the name element
const nameElement = document.getElementById("name");
// access email element 
const email = document.getElementById("email");
// access card input
const ccNum = document.getElementById("cc-num");
const zip = document.getElementById("zip");
const CvvNum = document.getElementById("cvv");



// HELPER VALIDATION FUNCTIONS:
function nameValidator() {
    const nameValue = nameElement.value;
    const isNameValid = /^[a-zA-Z]+\s?[a-zA-Z]+?\s?[a-zA-Z]+?$/.test(nameValue);
    console.log(`Name validation test on "${nameValue}" evaluates to ${isNameValid}`);
    return isNameValid;
}

function emailValidator() {
    const emailValue = email.value;
    const isEmailValid = /^[^@]+@[^@.]*.com/.test(emailValue);
    console.log(`Email validation test on "${emailValue}" evaluates to ${isEmailValid}`); 
    return isEmailValid;
}

function cardNumValidator() {
    const ccNumValue = ccNum.value;
    const isCcNumValid = /^(\d{13}|\d{14}|\d{15}|\d{16})$/.test(ccNumValue);
    console.log(`CC validation test on "${ccNumValue}" evaluates to ${isCcNumValid}`);
    return isCcNumValid;
}

function zipValidator() {
    const zipValue = zip.value;
    const isZipValid = /^\d{5}$/.test(zipValue);
    console.log(`Zipcode validation test on "${zipValue}" evaluates to ${isZipValid}`); 
    return isZipValid;
}

function CvvNumValidator() {
    const CvvNumValue = CvvNum.value;
    const isCvvNumValid = /^\d{3}$/.test(CvvNumValue);
    console.log(`CVV Number validation test on "${CvvNumValue}" evaluates to ${isCvvNumValid}`); 
    return isCvvNumValid;
}

function isOneActivitySelected() {
    let activityCount = 6;
    for (let i = 0; i < activitiesBox.children.length; i++) {
        const currentActivity = activitiesBox.children[i].firstElementChild;
        if (!currentActivity.checked) {
            activityCount --;
        }
    }
    if (activityCount < 0) {
        return false; 
    }
    console.log(`Activity validation test evaluates to ${true}`);
    return true; 
}

// add eventListener for form element
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!isOneActivitySelected()) {
        // if true, stop submission
        e.preventDefault();
        // log what is preventing submission
        console.log("No Activities are selected");
    }
    // check if validator function is retruing false
    if (!nameValidator()) {
        // if true, stop submission
        e.preventDefault();
        // log what is preventing submission
        console.log("name is preventing submission");
    }
    // check if validator function is retruing false
    if (!emailValidator()) {
        // if true, stop submission
        e.preventDefault();
        // log what is preventing submission
        console.log("email is preventing submission");
    }
    if (paymentMethodsConstants.paymentElement.value === "credit-card") {
        if (!cardNumValidator()) {
            // if true, stop submission
            e.preventDefault();
            // log what is preventing submission
            console.log("Card number is preventing submission");
        }
        if (!zipValidator()) {
            // if true, stop submission
            e.preventDefault();
            // log what is preventing submission
            console.log("Zip number is preventing submission");
        }
        if (!CvvNumValidator()) {
            // if true, stop submission
            e.preventDefault();
            // log what is preventing submission
            console.log("CVV code is preventing submission");
        }
    } 
    console.log('Submit handler is functional!');
});