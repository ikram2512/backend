const express = require('express');

const connect = require('./config/connect');


const articleRoute = require('./routes/article')
const menuRoute = require('./routes/menu')
const adminRoute = require('./routes/admin')
const clientRoute=require('./routes/client')
const livreurRoute=require('./routes/livreur')
const commandeRoute=require('./routes/commande')
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors());


app.use('/article' , articleRoute);
app.use('/admin' , adminRoute);
app.use('/menu' , menuRoute);
app.use('/client' , clientRoute);
app.use('/livreur' , livreurRoute);
app.use('/commande' , commandeRoute);
app.use('/getfile' , express.static('./upload') );


app.listen(4000 , ()=>{
    console.log('server work');
} )