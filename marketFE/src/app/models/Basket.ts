import { BasketItem } from "./BasketItem";
import { User } from "./User";

export class Basket {
    id!: Number;
    basketItems!: Array<BasketItem>;
    customer!: User;

    constructor(){
        this.basketItems = new Array<BasketItem>();
    }
}

