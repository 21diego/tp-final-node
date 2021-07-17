import{getProductById} from "../repository/productRepository.js"
import { saveOrder } from "../repository/orderRepository.js";
 export function serviceGenerateOrder(req,res){
    //contruir productos
    let productos={};
    let order;
    let total=0;
    console.log(req.body.products)
    if (req.body.products.length>=0){
        req.body.products.forEach(element => {
            let nameProduct=element.uid;
            let price=element.price;
            console.log("el elemento es= "+ element);
            total+=price*element.count;
            let orderProduct={"name":nameProduct,"price":price,"count":element.count};
            productos[element.uid]=orderProduct;
        });
    }
    //construir order
    const date = Date.now();
    const now= new Date(date);
    order={"user":req.body.user,"products":productos,"total":total,"date":now};
    console.log(order);
    saveOrder(res,order);
    }