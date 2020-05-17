//* Jasmine Maguire

//* Array containing product info, code from Smartphone Products and Lab10.
var products = [
    {
        "name" : "Chinese Elm Bonsai",
        "price" : 100,
        "image" : "./images/Chinese_Elm_Bonsai.jpg",
        "description" : "Indoor"
    },
    {   
        "name" : "Fringe Flower",
        "price" : 35,
        "image" : "./images/Fringe_Flower.jpg",
        "description" : "Indoor/Outdoor"
    },
    {
        "name" : "Green Mound Juniper",
        "price" : 95,
        "image" : "./images/Green_Mound_Juniper.jpg",
        "description" : "Indoor"
    },
    {
        "name" : "Hawaiian Umbrella",
        "price" : 45,
        "image" : "./images/Hawaiian_Umbrella.jpg",
        "description" : "Indoor"
    },
    {
        "name" : "Satsuki Azalea",
        "price" : 70,
        "image" : "./images/Satsuki_Azalea.jpg",
        "description" : "Outdoor"
    },
    {
        "name" : "Money Tree Grove",
        "price" : 50,
        "image" : "./images/Money_Tree_Grove.jpg",
        "description" : "Indoor"
    }
];
// referenced from lab 13, exports the product data so we can get it in the product_display

if(typeof module != 'undefined') {
    module.exports.products = products;
  }