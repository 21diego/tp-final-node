import { json } from 'express';
import initializer from '../firebase.js';
const db = initializer.database();

export function getListProducts(req,res){
    let ref = db.ref("products/");
    
    ref.once("value")
    .then(function(snapshot) {
        res.json(snapshot);
    });
}

export function getProductById(res,id){
    let ref = db.ref("products/"+id);
    ref.once("value").then(function(snapshot) {
        res.json(snapshot);
        console.log(res.json(snapshot));
    });
}
