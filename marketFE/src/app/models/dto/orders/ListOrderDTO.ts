import { OrderDTO } from "./OrderDTO";

export class ListOrderDTO {
    list!: Array<OrderDTO>;
    totOrdini!: number;

    constructor(){
        this.list = new Array<OrderDTO>();
    }
}