const express = require('express');
const multer = require('multer');


const Commande = require('../models/commande');

const router = express.Router();

filen = '';







router.post('/addcommande' , (req,res)=>{

    let data = req.body;
    let commande = new Commande(data);

   
    commande.save()
            .then(
                (savedCommande)=>{
                    filen = '';
                    res.send(savedCommande);
                }
            )
            .catch(
                (err)=>{
                    res.send(err);
                }
            )

})

router.get('/allcommande' , (req,res)=>{

    Commande.find()
    .then(
        ( allcommandes )=>{
            res.send(allcommandes);
        }

    )
    .catch(
        (err)=>{
            res.send(err);
        }
    )


})

router.get('/byidcommande/:id' , (req,res)=>{

    let id = req.params.id
    Commande.findOne({ _id: id })
        .then( 
            (commande)=>{
                res.send(commande);
            }
        )
        .catch(
            (err)=>{
                res.send(err);
            }
        )


})


router.delete('/deletecommande/:id' , (req,res)=>{

    let id = req.params.id;
    Commande.findOneAndDelete({ _id: id })
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

router.put('/updatecomm/:id' , (req,res)=>{

    let id = req.params.id;
    let newData = req.body;
    
    Commande.findOneAndUpdate({ _id: id } , newData  )
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


router.put('/updatecommande/:id' , (req,res)=>{

    let id = req.params.id;
    let newData = req.body;
    Commande.findOneAndUpdate({ _id: id } , newData  )
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