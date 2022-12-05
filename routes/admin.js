const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

const router = express.Router();



router.post('/register' , (req,res)=>{

    let data = req.body;
    let admin = new Admin(data);
    let salt = bcrypt.genSaltSync(10);
    admin.password = bcrypt.hashSync( data.password , salt );

    admin.save()
            .then(
                (savedAdmin)=>{
                    res.send(savedAdmin);
                }
            )
            .catch(
                (err)=>{
                    res.send(err);
                }
            )

})


router.post('/login' , (req,res)=>{
    let data = req.body;
    Admin.findOne({ email: data.email })
        .then(
            (foundedAdmin)=>{
                let valid = bcrypt.compareSync(data.password , foundedAdmin.password);
                if(valid == false){
                    res.send('email or pass invalid')
                }else{
                    let payload = {
                        _id: foundedAdmin._id,
                        email: foundedAdmin.email,
                        name: foundedAdmin.name
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





router.get('/byid/:id' , (req,res)=>{

    let id = req.params.id
    Admin.findOne({ _id: id })
        .then( 
            (Admin)=>{
                res.send(Admin);
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
    Admin.findOneAndDelete({ _id: id })
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

router.put('/update/:id' , (req,res)=>{

    let id = req.params.id;
    let newData = req.body;

    Admin.findOneAndUpdate({ _id: id } , newData  )
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