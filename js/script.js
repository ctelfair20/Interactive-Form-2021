/*  390 lines of code
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

const nameElement = document.getElementById('name');
nameElement.focus();

const otherJobField = document.getElementById('other-job-role');
otherJobField.style.display = 'none';

const jobRoles = document.getElementById('title');

/* THE FOLLOWING EVENT LISTENER:
- hides/shows the other job input box when needed */

jobRoles.addEventListener('change', (e) => {
    if (e.target.tagName === 'SELECT' && e.target.value === 'other') {
        otherJobField.style.display = 'inherit';
    } else {
        otherJobField.style.display = 'none';
    }
});

const designField = document.getElementById('design');
const colorField = document.getElementById('color');

if (designField.value === 'Select Theme') {
    colorField.disabled = true;
}
/* THE FOLLOWING EVENT LISTENER:
- prevents users from selecting unavailable colors for their T-shirts */

designField.addEventListener('change', (e) => {
    for (let i = 1; i < colorField.children.length; i++) {
        let colorOption = colorField.children[i];
       
        if (designField.value === 'js puns') {
            colorField.disabled = false;
            colorOption.style.display = 'inherit';

            if (colorOption.dataset.theme === 'heart js') {
                colorOption.style.display = 'none';
            }
        
        } else if (designField.value === 'heart js') {
            colorField.disabled = false;
            colorOption.style.display = 'inherit';

            if (colorOption.dataset.theme === 'js puns') {
                colorOption.style.display = 'none';
            }
        }
    }
});

const activitiesFieldset = document.getElementById('activities');
const activitiesBox = document.getElementById('activities-box');
const totalElement = document.getElementById('activities-cost');
let price = 0;

// HELPER FUNCTIONS FOR activitiesFieldset CHANGE EVENT 
function getPrice(input) {
    const price = input.dataset.cost;
    return price;
}

function getTime(input) {
    const time = input.dataset.dayAndTime;
    return time;
}

/* THE FOLLOWING EVENT LISTENER:
- verifies if at least one activity is selected 
- prevents users from selecting conflicting classes 
- updates the total in real-time */

activitiesFieldset.addEventListener('change', (e) => {
    isOneActivitySelected();

    const targetInput = e.target;

    for (let i = 0; i < activitiesBox.children.length; i++) {
        const currentInput = activitiesBox.children[i].firstElementChild;
        if (targetInput !== currentInput) {
            if (getTime(targetInput) === getTime(currentInput)) {
                if (targetInput.checked === false) {
                    currentInput.disabled = false;
                } else {
                    currentInput.disabled = true;
                }
            }
        }
    }
    if (targetInput.checked) {
        price += +getPrice(targetInput);
        totalElement.textContent = `Total: $${price}`;

    } else if (!targetInput.checked) {
        price -= +getPrice(targetInput);
        totalElement.textContent = `Total: $${price}`
    }
});

paymentMethodsConstants = {
    paymentElement: document.getElementById('payment'),
    creditCardDiv: document.getElementById('credit-card'), 
    paypalDiv: document.getElementById('paypal'),
    bitcoinDiv: document.getElementById('bitcoin')
}

paymentMethodsConstants.paymentElement.value = 'credit-card';
paymentMethodsConstants.paypalDiv.style.display = 'none';
paymentMethodsConstants.bitcoinDiv.style.display = 'none';

/* THE FOLLOWING EVENT LISTENER:
- hides/reveals the appropriate payment input fields */

paymentMethodsConstants.paymentElement.addEventListener('change', (e) => {
    for (let prop in paymentMethodsConstants) {
        paymentMethodsConstants[prop].style.display = 'inherit'
        if (paymentMethodsConstants.paymentElement.value === 'paypal') {
            if (prop !== 'paypalDiv' && prop !== 'paymentElement') {
                paymentMethodsConstants[prop].style.display = 'none';
            }

        } else if (paymentMethodsConstants.paymentElement.value === 'bitcoin') {
            if (prop !== 'bitcoinDiv' && prop !== 'paymentElement') {
                paymentMethodsConstants[prop].style.display = 'none';
            }

        } else if (paymentMethodsConstants.paymentElement.value === 'credit-card') {
            if (prop !== 'creditCardDiv' && prop !== 'paymentElement') {
                paymentMethodsConstants[prop].style.display = 'none';
            }
        }
    }
});

const form = document.querySelector('form');
const email = document.getElementById('email');
const ccNum = document.getElementById('cc-num');
const zip = document.getElementById('zip');
const cvvNum = document.getElementById('cvv');
const nameHint = document.getElementById('name-hint');
const emailHint = document.getElementById('email-hint');

/* HELPER VALIDATION FUNCTIONS:
- checks if the user inputed their name, email, card number, CVV number and zip code are formatted properly */ 

function nameValidator() {
    const nameLabel = nameElement.parentElement;
    const nameValue = nameElement.value;
    const isNameValid = /^[A-Z]+\s?[A-Za-z]*?\s?[a-zA-Z]*?\s?$/.test(nameValue);
    const isNameValid2 = /^[a-z]+\s?[A-Za-z]*?\s?[a-zA-Z]*?\s?$/.test(nameValue);
    console.log(`Name validation test on "${nameValue}" evaluates to ${isNameValid}`);
    console.log(`Second name validation test on "${nameValue}" evaluates to ${isNameValid2}`);
    if (isNameValid) {
        nameLabel.className = 'valid';
        nameLabel.lastElementChild.style.display = 'none';
        return isNameValid;
    } else if (isNameValid2) {
        nameHint.textContent = 'Must capitalize first name';
        nameLabel.className = 'not-valid';
        nameLabel.lastElementChild.style.display = 'inherit';
    } else {
        nameHint.textContent = 'Name field cannot be blank';
        nameLabel.className = 'not-valid';
        nameLabel.lastElementChild.style.display = 'inherit';
    }
}

function emailValidator() {
    const emailLabel = email.parentElement;
    const emailValue = email.value;
    const isEmailValid = /^[^@]+@[^@.]*.com$/.test(emailValue);
    const isEmailValid2 = /^[^@]+@[^@.]*$/.test(emailValue);
    console.log(`Email validation test on "${emailValue}" evaluates to ${isEmailValid}`);
    console.log(`Second email validation test on "${emailValue}" evaluates to ${isEmailValid2}`); 
    if (isEmailValid) {
        emailLabel.className = 'valid';
        emailLabel.lastElementChild.style.display = 'none';
        return isEmailValid;
    } else if (isEmailValid2) {
        emailHint.textContent = 'Did you add the ".com" part?';
        emailLabel.className = 'not-valid';
        emailLabel.lastElementChild.style.display = 'inherit';
    } else {
        emailHint.textContent = 'Email address must be formatted correctly';
        emailLabel.className = 'not-valid';
        emailLabel.lastElementChild.style.display = 'inherit';
    }
}

function cardNumValidator() {
    const ccNumLabel = ccNum.parentElement;
    const ccNumValue = ccNum.value;
    const isCcNumValid = /^(\d{13}|\d{14}|\d{15}|\d{16})$/.test(ccNumValue);
    console.log(`CC validation test on "${ccNumValue}" evaluates to ${isCcNumValid}`);
    if (isCcNumValid) {
        ccNumLabel.className = 'valid';
        ccNumLabel.lastElementChild.style.display = 'none';
        return isCcNumValid;
    } else {
        ccNumLabel.className = 'not-valid';
        ccNumLabel.lastElementChild.style.display = 'inherit';
    }
}

function zipValidator() {
    const zipLabel = zip.parentElement;
    const zipValue = zip.value;
    const isZipValid = /^\d{5}$/.test(zipValue);
    console.log(`Zipcode validation test on "${zipValue}" evaluates to ${isZipValid}`); 
    if (isZipValid) {
        zipLabel.className = 'valid';
        zipLabel.lastElementChild.style.display = 'none';
        return isZipValid;
    } else {
        zipLabel.className = 'not-valid';
        zipLabel.lastElementChild.style.display = 'inherit';
    }
}

function cvvNumValidator() {
    const cvvNumLabel = cvvNum.parentElement;
    const cvvNumValue = cvvNum.value;
    const isCvvNumValid = /^\d{3}$/.test(cvvNumValue);
    console.log(`CVV Number validation test on "${cvvNumValue}" evaluates to ${isCvvNumValid}`); 
    if (isCvvNumValid) {
        cvvNumLabel.className = 'valid';
        cvvNumLabel.lastElementChild.style.display = 'none';
        return isCvvNumValid;
    } else {
        cvvNumLabel.className = 'not-valid';
        cvvNumLabel.lastElementChild.style.display = 'inherit';
        return false;
    }
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
        activitiesFieldset.className = 'activities not-valid';
        activitiesFieldset.lastElementChild.style.display = 'inherit';
        return false; 
    }
    console.log(`Activity validation test evaluates to ${true}`);
    activitiesFieldset.className = 'activities valid';
    activitiesFieldset.lastElementChild.style.display = 'none';
    return true; 
}

/* THE FOLLOWING EVENT LISTENER:
- prevents form from submiting unless all required fields are satisfied */

form.addEventListener("submit", (e) => {
    if (!isOneActivitySelected()) {
        e.preventDefault();
    } 
    if (!nameValidator()) {
        e.preventDefault();  
    }
    if (!emailValidator()) {
        e.preventDefault();
    }

    if (paymentMethodsConstants.paymentElement.value === "credit-card") {
        if (!cardNumValidator()) {
            e.preventDefault();
        }
        if (!zipValidator()) {
            e.preventDefault();
        }
        if (!cvvNumValidator()) {
            e.preventDefault();
        }
    } 
});

/* THE FOLLOWING EVENT LISTENER:
- Makes the focus states more obvious while user tabs through the activities */

activitiesFieldset.addEventListener('focus', (e) => {
    const currentCheckbox = e.target;
    const currentLabel = currentCheckbox.parentElement;
    currentLabel.className = 'focus';
}, true);

activitiesFieldset.addEventListener('blur', (e) => {
    const currentCheckbox = e.target;
    const currentLabel = currentCheckbox.parentElement;
    currentLabel.className = '';
}, true);

/* THE FOLLOWING EVENT LISTENER:
- supplies real-time error messages to the user */

form.addEventListener('keyup', (e) => {
    if (paymentMethodsConstants.paymentElement.value === 'credit-card') {
        if (e.target === nameElement){
            nameValidator();
        } else if (e.target === email) {
            emailValidator();
        } else if (e.target === ccNum) {
            cardNumValidator();
        } else if (e.target === zip) {
            zipValidator();
        } else if (e.target === cvvNum) {
            cvvNumValidator();
        } 
    } else {
        if (e.target === nameElement){
            nameValidator();
        } else if (e.target === email) {
            emailValidator();
        }
    }
});