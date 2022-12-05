const mongoose = require('mongoose');

let Admin = mongoose.model( 'Admin' , {

    name:String,
    email:String,
    password:String


});


module.exports = Admin;


