import{getProductById} from "../repository/productRepository.js"
import { saveOrder } from "../repository/orderRepository.js";
 export function serviceGenerateOrder(req,res){
    //contruir productos
    let productos=[];
    let order;
    let total=0;
    console.log(req.body.products)
    if (req.body.products.length>=0){
        req.body.products.forEach(element => {
            let idProduct=element.id;
            let price=element.price;
            let name = element.name;
            total+=price;
            let orderProduct={"id":idProduct, "name": name,"price":price, count: 1};
            let existe = false;
            productos.forEach( prod => {
                if(prod.id === idProduct){
                    prod.count++;
                    existe = true;
                }
            })
            if(!existe){
                productos.push(orderProduct)
            }
            
        });
    }
    //construir order
    const now= new Date(Date.now());
    order={"user":req.body.email,"products":productos,"total":total,"date":now};
    console.log(order);
    saveOrder(res,order);
    }