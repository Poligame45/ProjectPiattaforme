import { PurchasedItemDTO } from "../purchasedItemDTO/purchasedItemDTO";

export class OrderDTO{
    id!:number;
    dataAcquisto!:Date;
    totale!:number;
    customerId!:number;
    purchasedItemList!:Array<PurchasedItemDTO>;
}


