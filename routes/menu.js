const express = require('express');

const Menu = require('../models/menu');

const router = express.Router();

const multer = require('multer');

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

router.post('/add' , upload.any('image') ,(req,res)=>{

    let data = req.body;
    let menu = new Menu(data);
    menu.image = filen;
    menu.save()
            .then(
                (savedMenu)=>{
                    filen = '';
                    res.send(savedMenu);
                }
            )
            .catch(
                (err)=>{
                    res.send(err);
                }
            )

})

router.get('/all' , (req,res)=>{

    Menu.find()
    .then(
        ( allMenus )=>{
            res.send(allMenus);
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
    Menu.findOne({ _id: id })
        .then( 
            (Menu)=>{
                res.send(Menu);
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
    Menu.findOneAndDelete({ _id: id })
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
    Menu.findOneAndUpdate({ _id: id } , newData  )
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