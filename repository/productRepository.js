
import initializer from '../firebase.js'
const db = initializer.initializer.database();
export function getListProducts(res){
    let ref = db.ref("products/");
    
    ref.once("value")
    .then(function(snapshot) {
        res.json(snapshot);
    });
}
