import {getListProducts} from "../repository/productRepository.js";
import{getProductById} from "../repository/productRepository.js";

 function getProducts (req,res){
    getListProducts(req, res);   
}

function getProduct(req,res){
    const id=req.params.id;
   getProductById(res,id);
}

export { getProducts,getProduct }