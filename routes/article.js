const express = require('express');
const multer = require('multer');


const Article = require('../models/article');

const router = express.Router();

filen = '';

const mystorage = multer.diskStorage(
    {
        destination:'./upload',
        filename: (req, file, cb)=>{
            filen = Date.now() + '.' + file.mimetype.split('/')[1];
            cb(null , filen);
        }

    }


);

const upload = multer( { storage: mystorage } );


router.post('/add' , upload.any('image')  , (req,res)=>{

    let data = req.body;
    let article = new Article(data);

    article.image = filen;
    article.save()
            .then(
                (savedArticle)=>{
                    filen = '';
                    res.send(savedArticle);
                }
            )
            .catch(
                (err)=>{
                    res.send(err);
                }
            )

})

router.get('/all' , (req,res)=>{

    Article.find()
    .then(
        ( allarticles )=>{
            res.send(allarticles);
        }

    )
    .catch(
        (err)=>{
            res.send(err);
        }
    )


})

router.get('/byid/:id' , (req,res)=>{

    let id = req.params.id
    Article.findOne({ _id: id })
        .then( 
            (article)=>{
                res.send(article);
            }
        )
        .catch(
            (err)=>{
                res.send(err);
            }
        )


})


router.delete('/delete/:id' , (req,res)=>{

    let id = req.params.id;
    Article.findOneAndDelete({ _id: id })
        .then(
            (deleted)=>{
                res.send(deleted);
            }
        )
        .catch(
            (err)=>{
                res.send(err);
            }
        )

})

router.put('/update/:id' , upload.any('image') , (req,res)=>{

    let id = req.params.id;
    let newData = req.body;
    newData.image = filen;
    Article.findOneAndUpdate({ _id: id } , newData  )
        .then(

            (updated)=>{
                filen = '';
                res.send(updated);
            }

        )
        .catch(
            (err)=>{
                res.send(err)
            }
        )




})


router.put('/update2/:id' , (req,res)=>{

    let id = req.params.id;
    let newData = req.body;
    Article.findOneAndUpdate({ _id: id } , newData  )
        .then(

            (updated)=>{
                res.send(updated);
            }
        )
        .catch(
            (err)=>{
                res.send(err)
            }
        )




})





module.exports = router;