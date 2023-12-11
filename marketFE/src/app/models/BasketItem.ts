import { Basket } from "./Basket";
import { StoredProduct } from "./StoredProduct";

export class BasketItem{
        id!:Number;
        carrello!:Basket;
        storedProduct!:StoredProduct;
        quantita!:number;
} 