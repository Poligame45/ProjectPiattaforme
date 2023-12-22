import { StoredProduct } from "../../StoredProduct";

export class PurchasedItemDTO {
    codice!: number;
    qtaAcquistata!: number;
    storedProduct!: StoredProduct;
    orderId!: number;
}    