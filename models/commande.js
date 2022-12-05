const mongoose = require('mongoose');

let Commande = mongoose.model( 'Commande' , {
    
    numCommande:String,
    nomClient:String,
    nomArticle:String,
    adresse:String,
    prix: Number

});


module.exports = Commande;