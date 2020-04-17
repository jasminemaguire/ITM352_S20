//* Array containing product info, code from Smartphone Products and Lab10.
var products = [
    {
        "name" : "Chinese Elm Bonsai",
        "price" : 100,
        "image" : "./images/Chinese_Elm_Bonsai.jpg"
    },
    {   
        "name" : "Fringe Flower",
        "price" : 35,
        "image" : "./images/Fringe_Flower.jpg"
    },
    {
        "name" : "Green Mound Juniper",
        "price" : 95,
        "image" : "./images/Green_Mound_Juniper.jpg"
    },
    {
        "name" : "Hawaiian Umbrella",
        "price" : 45,
        "image" : "./images/Hawaiian_Umbrella.jpg"
    },
    {
        "name" : "Satsuki Azalea",
        "price" : 70,
        "image" : "./images/Sakura_Azalea.jpg"
    },
    {
        "name" : "Money Tree Grove",
        "price" : 50,
        "image" : "./images/Money_Tree_Grove.jpg"
    }
];
if(typeof module != 'undefined') {
    module.exports.products = products;
  }