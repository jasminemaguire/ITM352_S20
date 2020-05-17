
//From https://www.w3schools.com/jsref/prop_win_localstorage.asp
//functions to add individual items to cart

function addChineseElmBonsaiToCart() {
    if (typeof (Storage) !== "undefined") { 
        localStorage.setItem("ChineseElmBonsaiCart", JSON.stringify(products[0])); //save data to local storage
        storedChineseElmBonsaiCart = JSON.parse(localStorage.getItem("ChineseElmBonsaiCart")); 
    }
    alert("Chinese Elm Bonsai added to cart"); 
}


function addFringeFlowerToCart() {
    if (typeof (Storage) !== "undefined") { 
        localStorage.setItem("FringeFlowerCart", JSON.stringify(products[1])); //save data to local storage
        storedFringeFlower = JSON.parse(localStorage.getItem("FringeFlowerCart")); 

    }
    alert("Fringe Flower added to cart"); 
}

function addGreenMoundJuniperToCart() {
    if (typeof (Storage) !== "undefined") { 
        localStorage.setItem("GreenMoundJuniperCart", JSON.stringify(products[2])); //save data to local storage
        storedGreenMoundJuniperCart = JSON.parse(localStorage.getItem("GreenMoundJuniperCart")); 

    }
    alert("Green Mound Juniper added to cart"); 
}

function addHawaiianUmbrellaToCart() {
    if (typeof (Storage) !== "undefined") { 
        localStorage.setItem("HawaiianUmbrellaCart", JSON.stringify(products[3])); //save data to local storage
        storedHawaiianUmbrellaCart = JSON.parse(localStorage.getItem("HawaiianUmbrellaCart")); 

    }
    alert("Hawaiian Umbrella added to cart"); 
}

function addMoneyTreeGroveToCart() {
    if (typeof (Storage) !== "undefined") { 
        localStorage.setItem("MoneyTreeGroveCart", JSON.stringify(products[4])); //save data to local storage
        storedMoneyTreeGroveCart = JSON.parse(localStorage.getItem("MoneyTreeGroveCart")); 

    }
    alert("Money Tree Grove added to cart"); 
}

function addSatsukiAzalea() {
    if (typeof (Storage) !== "undefined") { 
        localStorage.setItem("SatsukiAzaleaCart", JSON.stringify(products[5])); //save data to local storage
        storedSatsukiAzaleaCart = JSON.parse(localStorage.getItem("SatsukiAzaleaCart")); 

    }
    alert("Satsuki Azalea added to cart"); 
}

