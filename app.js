//Archivo de configuracion de la app
const express = require('express');
const db = require('./firebase.js').database();

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

app.post('/register', (req, res) => {
    console.log("JSON:" + JSON.stringify(req.body));
    //let body = JSON.parse(req.body);
    //res.send(`Hello World! ${req.method} : ${req.body.usuario}`)
    res.json({
        bienvenido: `${req.body.usuario}`
    })
});

app.post('/login', (req, res) => {
    console.log("JSON:" + JSON.stringify(req.body));
    //let body = JSON.parse(req.body);
    //res.send(`Hello World! ${req.method} : ${req.body.usuario}`)
    res.json({
        bienvenido: `${req.body.usuario}`
    })
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
module.exports = app;
