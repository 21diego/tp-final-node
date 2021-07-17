//Archivo de configuracion de la app

import {getProduct, getProducts} from './controller/marketController.js';
import express from 'express';
import initializer from './firebase.js'
import { register, login, logout, getCurrentUser } from './services/user.service.js';
import { generateOrder } from './controller/orderController.js';

const db = initializer.database();
const app = express();

let isLogin = () => true;

let logger = (req, res, next) => {
    console.log('Peticion de tipo: ', req.method );
    next();
}

app.use((req, res, next) => {
    if(isLogin()){
        next();
    }else{
        res.send('No estas logeado');
    }
}, logger);

//app.use(logger);

app.use(express.json());

//De esta forma se obtienen los datos de la base de datos
app.get('/users', (req,res) => {   
    
    let ref = db.ref("users/");
    
    ref.once("value")
    .then(function(snapshot) {
        var key = snapshot.key; // "ada"
        res.json(snapshot);
    });
    
})

app.get('/api/market',(req,res) => {   
    
   getProducts(req,res);
    
});


app.get('/api/logout',(req,res) => {
    logout(res);
})

app.get('/api/user',(req,res)=> {
    getCurrentUser(res)
})


app.post('/api/register', (req, res) => {
    console.log("JSON:" + JSON.stringify(req.body));

    register(req.body.email, req.body.password, req.body.name, req.body.lastname, req.body.address, res);
   
});

app.post('/api/login', (req, res) => {
    console.log("JSON:" + JSON.stringify(req.body));
    login(req.body.email, req.body.password,res);
});

app.get('/api/market/product/:id', (req, res)=> {
    getProduct(req,res);
});

app.post('/api/order', (req, res) => {
    generateOrder(req,res);
});
/*
app.get('/', (req, res) => {
    console.log("Hola usuario")
    res.send('Hello World!')
})

app.get('/user/:user', (req, res) => {
    console.log('Invocacion nueva');
    let usuario = req.params.user;
    //res.send(`Bienvenido ${usuario}`);    
    res.json({
        bienvenido: `${usuario}`
    });
});



app.put('/', (req, res) => {
    res.send(`Hello World! ${req.method}`)
});

app.delete('/', (req, res) => {
    res.send(`Hello World! ${req.method}`)
});
*/
export  {app};
