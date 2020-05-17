//Jasmine Maguire Assignment 3
//From Smartphone Products
//From Lab 10
//From Lab 15 - Cookies
//From https://www.w3schools.com/js/js_cookies.asp

var products = [
    {
        "name": "Chinese Elm Bonsai",
        "price": 100,
        "image": "/images/Chinese_Elm_Bonsai.jpg",
        "description": "Indoor"
    },
    {
        "name": "Fringe Flower",
        "price": 35,
        "image": "/images/Fringe_Flower.jpg",
        "description": "Indoor"
    },
    {
        "name": "Green Mound Juniper",
        "price": 95,
        "image": "/images/Green_Mound_Juniper.jpg",
        "description": "Outdoor"
    },
    {
        "name": "Hawaiian Umbrella",
        "price": 45,
        "image": "/images/Hawaiian_Umbrella.jpg",
        "description": "Indoor/Outdoor"
    },
    {
        "name": "Money Tree Grove",
        "price": 75,
        "image": "/images/Money_Tree_grove.jpg",
        "description": "Indoor"
    },
    {
        "name": "Satsuki Azalea",
        "price": 50,
        "image": "/images/Satsuki_Azalea.jpg",
        "description": "Outdoor"
    }
];

//checks if the products in the array are defined
if (typeof module != 'undefined') {
    module.exports.products = products;
}

//Source: https://www.w3schools.com/js/js_cookies.asp
//function to set a cookie
function setCookie0(cname, cvalue, exdays) { //The name of the cookie (cname), the value of the cookie (cvalue), and the number of days until the cookie should expire (exdays)
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 10000)); //Sets the expiration of cookie to 5 minutes after being set
    var expires = "expires=" + d.toGMTString(); 
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"; //The function sets a cookie by adding together the cookiename, the cookie value, and the expires string.
}

//Source: https://www.w3schools.com/js/js_cookies.asp
//function to get a cookie
function getCookie0(cname) { 
    var name = cname + "="; //Create a variable (name) with the text to search for (cname + "=").
    var decodedCookie = decodeURIComponent(document.cookie); //Decode the cookie string to handle cookies with special characters
    var ca = decodedCookie.split(';'); //Split the cookie on semi-colons into an array
    for (var i = 0; i < ca.length; i++) { //Loop the ca array
        var c = ca[i]; 
        while (c.charAt(0) == ' ') { //While index at specified string == 0
            c = c.substring(1); //c now is now given string 
        }
        if (c.indexOf(name) == 0) { //If the cookie is found
            return c.substring(name.length, c.length); //Return the cookie value
        }
    }
    return ""; //If the cookies is not found, return ""
}

//functions to set cookies for each product
//function adds the name to its own cookie, sets value to its position in products array and sets the experation time
function checkCookie0() {
    setCookie0("ChineseElmBonsai", JSON.stringify(products[0]), 30); 
}
function checkCookie1() {
    setCookie0("FringeFlower", JSON.stringify(products[1]), 30); 

}
function checkCookie2() {
    setCookie0("GreenMoundJuniper", JSON.stringify(products[2]), 30); 

}
function checkCookie3() {
    setCookie0("HawaiianUmbrella", JSON.stringify(products[3]), 30); 

}
function checkCookie4() {
    setCookie0("MoneyTreeGrove", JSON.stringify(products[4]), 30); 

}
function checkCookie5() {
    setCookie0("SatsukiAzalea", JSON.stringify(products[5]), 30); 

}


function displayProducts() {
//function to display the trees 
    for (i = 0; i < products.length; i++) { 
        document.write(`
            <div class="shop-item">
                <a href="${(products[i].name).replace(/\s+/g, '')}.html" onclick="checkCookie${i}()" ><span class="shop-item-title">${products[i].name}</span></a>
                <div class="enlarge">
                    <img class="shop-item-image" src=${products[i].image}>
                </div>
                <div class="shop-item-details">
                <a href="${(products[i].name).replace(/\s+/g, '')}.html"><input class="btn btn-primary btn-purchase" type="button" name="purchase_submit" value="View Product" onclick="checkCookie${i}()"></a>
                </div>
            </div>
        `);
    }
}


function displayChineseElmBonsai() {
//function to display the product on its own page 
    document.write(`
            <div class="products">
            <img class="shop-item-image" src=${products[0].image}>
            <hr class="space" />
            <div class="shop-item-description"><b>Type:</b> ${products[0].description}</div>
            <div class="shop-item-details">
                 <span class="shop-item-price">$${products[0].price}</span>
            </div>
        </div>
    `);
}

function displayFringeFlower() {
//function to display the product on its own page 
document.write(`
            <div class="products">
            <img class="shop-item-image" src=${products[1].image}>
            <hr class="space" />
            <div class="shop-item-description"><b>Type:</b> ${products[1].description}</div>
            <div class="shop-item-details">
                 <span class="shop-item-price">$${products[1].price}</span>
            </div>
        </div>
    `);
}

function displayGreenMoundJuniper() {
//function to display the product on its own page 
document.write(`
            <div class="products">
            <img class="shop-item-image" src=${products[2].image}>
            <hr class="space" />
            <div class="shop-item-description"><b>Type:</b> ${products[2].description}</div>
            <div class="shop-item-details">
                 <span class="shop-item-price">$${products[2].price}</span>
            </div>
        </div>
    `);
}

function displayHawaiianUmbrella() {
//function to display the product on its own page 
document.write(`
            <div class="products">
            <img class="shop-item-image" src=${products[3].image}>
            <hr class="space" />
            <div class="shop-item-description"><b>Type:</b> ${products[3].description}</div>
            <div class="shop-item-details">
                 <span class="shop-item-price">$${products[3].price}</span>
            </div>
        </div>
    `);
}

function displayMoneyTreeGrove() {
//function to display the product on its own page 
document.write(`
            <div class="products">
            <img class="shop-item-image" src=${products[4].image}>
            <hr class="space" />
            <div class="shop-item-description"><b>Type:</b> ${products[4].description}</div>
            <div class="shop-item-details">
                 <span class="shop-item-price">$${products[4].price}</span>
            </div>
        </div>
    `);
}

function displaySatsukiAzalea() {
//function to display the product on its own page 
document.write(`
            <div class="products">
            <img class="shop-item-image" src=${products[5].image}>
            <hr class="space" />
            <div class="shop-item-description"><b>Type:</b> ${products[5].description}</div>
            <div class="shop-item-details">
                 <span class="shop-item-price">$${products[5].price}</span>
            </div>
        </div>
    `);
}


var storedUsersCartArray = [];

//check if the products in the array are defined
if (typeof module != 'undefined') {
    module.exports.storedUsersCartArray = storedUsersCartArray;
}