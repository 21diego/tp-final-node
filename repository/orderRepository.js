import initializer from '../firebase.js';
import { v4 as uuidv4 } from 'uuid';
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
const db = initializer.database();

export function saveOrder(res,order){
    console.log("entro a save Order");
    var uuid=uuidv4();
    db.ref('orders/' + uuid).set(order);
    res.status(201).json({"Created": true});
}
