//*Jasmine Maguire
//*From Lab 12
//*From Assignment 1 Example
//*From: https://www.w3schools.com/js/js_dates.asp

//From Lab 12
//Creates a function that checks if the input is valid
function isNonNegInt(q, return_errors = false) {
    errors = []; // assume no errors at first
    if (q == '') q = 0; // handle blank inputs as if they are 0
    if (Number(q) != q) errors.push('<div class="shop-item-error">Not a number!</div>'); // Check if string is a number value
    else if (q < 0) errors.push('<div class="shop-item-error">Negative value!</div>'); // Check if it is non-negative
    else if (parseInt(q) != q) errors.push('<div class="shop-item-error">Not an integer!</div>'); // Check that it is an integer
    return return_errors ? errors : (errors.length == 0); //returns erorrs if there are any errors
}

//From Assignment 1 Example
function checkQuantityTextbox(theTextbox) { //textbox displays errors or "you want:" if no errors
    errs = isNonNegInt(theTextbox.value, true); 
    if (errs.length == 0) errs = ['You want: ']; 
    if (theTextbox.value.trim() == '') errs = ['Quantity']; 
    document.getElementById(theTextbox.name + '_label').innerHTML = errs.join(", "); 
}

window.onload = function () {
    let params = (new URL(document.location)).searchParams; // get the query string which has the form data
    // form was submitted so check that quantities are valid then redirect to invoice if ok.
    if (params.has('purchase_submit')) { //user clicks purchase
        has_errors = false; // assume quantities are valid from the start
        total_qty = 0; // need to check if something was selected so we will look if the total > 0
        //For every product in the array, write the product number, display its image and name, and list price
        for (i = 0; i < products.length; i++) { 
            if (params.has(`quantity${i}`)) {
                a_qty = params.get(`quantity${i}`); 
                // make textboxes sticky in case of invalid data
                product_selection_form[`quantity${i}`].value = a_qty; //assigns a_qty into the value of quantity(i) in product_selection_form
                total_qty += a_qty; 
                if (!isNonNegInt(a_qty)) {
                    has_errors = true; // oops, invalid quantity
                    checkQuantityTextbox(product_selection_form[`quantity${i}`]); // show where the error is
                }
            }
        }
        // Now respond to errors or redirect to invoice if all is ok
        if (has_errors) {
            alert("Please enter only valid quantities!");
        } else if (total_qty == 0) { // no quantity selections, just give a general alert
            alert("Please select some quantities!");
        } else { // all good to go!
            window.location = `./login.html${document.location.search}`;
            window.stop;
        }
    }
}

//Source: https://www.w3schools.com/js/js_dates.asp
var today = new Date();
//retrieves year, month, date
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();