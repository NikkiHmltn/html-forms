const init = function() {
    document.getElementById('button-cancel').addEventListener('click', reset);
    document.getElementById('button-send').addEventListener('click', send);

};

const reset = function(ev) {
    // html will automically put the form back to the initial state
    // unless we do that
    ev.preventDefault();
    // we can reset programmatically 
    document.getElementById('form-user').reset();
    console.log('The page should be reset here');

    //if you want to do anything else, you can ... 
};

const validate = function() {
    let valid  = false; 
    let failures = [];

    const first = document.getElementById('input-first');
    const password = document.getElementById('input-password');
    const email = document.getElementById('input-email');
    const select = document.getElementById('input-age');
    const chk = document.getElementById('input-alive');
    
    //logic for first (element)
    if (first.value === '') {
        failures.push({input: 'input-first', msg: 'Required field'});
    } 
    if (email.value === '' || !email.value.includes('@')) {
        failures.push({input: 'input-email', msg: 'Required field'});
    } 
    if (password.value === '' || password.value.length < 8) {
        failures.push({input: 'input-password', msg: 'Must be at least 8 characters'});
    }
    //logic for select(element)
    if (select.selectedIndex === 0) {
        failures.push({input: 'input-age', msg: 'Too young....'});
    }
    if (!chk.checked) {
        failures.push({input: 'input-alive', msg: 'Must be alive to submit form'})
    }

    return failures; 
};

const send = function(ev) {
    ev.preventDefault();
    ev.stopPropagation(); //stops bubbling up to any parent element on click

    let fails = validate();

    if (fails.length === 0) {
        //good to go 
        document.getElementById('form-user').submit();
    } else {
        //bad user
        fails.forEach(obj => {
            const field = document.getElementById(obj.input);
            field.parentElement.classList.add('error');
            field.parentElement.setAttribute('data-errormsg', obj.msg);
        }
    )}
};

document.addEventListener('DOMContentLoaded', init);
