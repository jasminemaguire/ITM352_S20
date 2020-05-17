var userproducts = [];


//checks if the products in the array are defined
if (typeof module != 'undefined') {
    module.exports.userproducts = userproducts;
}

function welcome() {
    var name = prompt("Hello! What is your name?"); 
    alert("Hi " + name + "! Welcome to Jasmine's Bonsai Shop"); 
}

//displays products stored in the JSON array onto the products.html page when the function is called
function displayUserProducts() {
        document.write(`
            <div class="shop-item">
            <span class="shop-item-title">${userproducts[0].name}</span>
            <div class="enlarge">
                <img class="shop-item-image" src=${userproducts[0].image}>
            </div>
            <div class="shop-item-description">${userproducts[0].description}</div>
            <div class="shop-item-details">
                <span class="shop-item-price">$${userproducts[0].price.toFixed(2)}</span>
                <label id="quantity${0}_label" class="shop-item-quantity">Quantity</label>
                <input class="cart-quantity-input" type="text" name="quantity${0}" onkeyup=checkQuantityTextbox(this); placeholder="0">
            </div>
            </div>
        `);
    }

