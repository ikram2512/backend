const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Client = require('../models/client');

const router = express.Router();



router.post('/registerclient' , (req,res)=>{

    let data = req.body;
    let client = new Client(data);
    let salt = bcrypt.genSaltSync(10);
    client.password = bcrypt.hashSync( data.password , salt );

    client.save()
            .then(
                (savedClient)=>{
                    res.send(savedClient);
                }
            )
            .catch(
                (err)=>{
                    res.send(err);
                }
            )

})


router.post('/loginclient' , (req,res)=>{
    let data = req.body;
    Client.findOne({ email: data.email })
        .then(
            (foundedClient)=>{
                let valid = bcrypt.compareSync(data.password , foundedClient.password);
                if(valid == false){
                    res.send('email or pass invalid')
                }else{
                    let payload = {
                        _id: foundedClient._id,
                        email: foundedClient.email,
                        name: foundedClient.name,
                        lastname:foundedClient.lastname,
                        adress:foundedClient.adress
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


router.get('/allclients' , (req,res)=>{

    Client.find()
    .then(
        ( allclients )=>{
            res.send(allclients);
        }

    )
    .catch(
        (err)=>{
            res.send(err);
        }
    )


})


router.get('/byidclient/:id' , (req,res)=>{

    let id = req.params.id
    Client.findOne({ _id: id })
        .then( 
            (Client)=>{
                res.send(Client);
            }
        )
        .catch(
            (err)=>{
                res.send(err);
            }
        )


})


router.delete('/deleteclient/:id' , (req,res)=>{

    let id = req.params.id;
    Client.findOneAndDelete({ _id: id })
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

router.put('/updateclient/:id' , (req,res)=>{

    let id = req.params.id;
    let newData = req.body;

    Client.findOneAndUpdate({ _id: id } , newData  )
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