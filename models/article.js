const mongoose = require('mongoose');

let Article = mongoose.model( 'Article' , {

    titre:String,
    description:String,
    image:String,
    content: String


});


module.exports = Article;