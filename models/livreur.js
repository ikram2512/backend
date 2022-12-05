const mongoose = require('mongoose');

let Livreur = mongoose.model( 'Livreur' , {

    name:String,
    lastname:String,
    email:String,
    password:String,
    numcommande:Number

});


module.exports = Livreur;