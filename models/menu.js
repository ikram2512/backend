const mongoose = require('mongoose');

let Menu = mongoose.model( 'Menu' , {

    titre:String,
    description:String,
    image:String,
    prix: Number,
    calories: Number,
    weight: Number


});


module.exports = Menu;