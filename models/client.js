const mongoose = require('mongoose');

let Client = mongoose.model( 'Client' , {

    name:String,
    lastname:String,
    email:String,
    adress:String,
    password:String

});


module.exports = Client;