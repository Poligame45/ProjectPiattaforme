import { OrderDTO } from 'src/app/models/dto/orders/OrderDTO';
import { Basket } from "../../Basket";

export class UserDTO{
    id!:number;
    firstname!:String;
    lastname!:String;
    email!:String;
    address!:String;
    role!:String;
    basket!:Basket;
    ordini?:Array<OrderDTO>;
}