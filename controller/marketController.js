import {getListProducts} from "../repository/productRepository.js"
 function getProducts (req,res){
    getListProducts(res)   
}

export {getProducts}