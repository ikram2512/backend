const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Livreur = require('../models/livreur');

const router = express.Router();



router.post('/registerlivreur' , (req,res)=>{

    let data = req.body;
    let livreur = new Livreur(data);
    let salt = bcrypt.genSaltSync(10);
    livreur.password = bcrypt.hashSync( data.password , salt );

    livreur.save()
            .then(
                (savedLivreur)=>{
                    res.send(savedLivreur);
                }
            )
            .catch(
                (err)=>{
                    res.send(err);
                }
            )

})


router.post('/loginlivreur' , (req,res)=>{
    let data = req.body;
    Livreur.findOne({ email: data.email })
        .then(
            (foundedLivreur)=>{
                let valid = bcrypt.compareSync(data.password , foundedLivreur.password);
                if(valid == false){
                    res.send('email or pass invalid')
                }else{
                    let payload = {
                        _id: foundedLivreur._id,
                        email: foundedLivreur.email,
                        name: foundedLivreur.name
                    }
                    let token = jwt.sign( payload , 'secret123@09' );
                    res.send( { mytoken: token } )
                }
            }
        )
        .catch(
            (err)=>{ res.send(err); }
        )
})





router.get('/byidliv/:id' , (req,res)=>{

    let id = req.params.id
    Livreur.findOne({ _id: id })
        .then( 
            (Livreur)=>{
                res.send(Livreur);
            }
        )
        .catch(
            (err)=>{
                res.send(err);
            }
        )


})


router.delete('/deletelivreur/:id' , (req,res)=>{

    let id = req.params.id;
    Livreur.findOneAndDelete({ _id: id })
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

router.put('/updatelivreur/:id' , (req,res)=>{

    let id = req.params.id;
    let newData = req.body;

    Livreur.findOneAndUpdate({ _id: id } , newData  )
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