import { serviceGenerateOrder } from "../services/orderService.js";
 function generateOrder(req,res){
     console.log("entra generateOrder controller");
     serviceGenerateOrder(req,res);
}

export {generateOrder}