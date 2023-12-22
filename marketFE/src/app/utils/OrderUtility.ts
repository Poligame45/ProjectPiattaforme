import { firstValueFrom } from "rxjs";
import { OrdersService } from "../Services/orders.service";
import { SearchOrdersCommand } from "../models/command/orderCommand/searchOrderCommand";
import { ListOrderDTO } from "../models/dto/orders/ListOrderDTO";
import { OrderDTO } from "../models/dto/orders/OrderDTO";
import { Utility } from "./Utility";

export class OrderUtility extends Utility {
    totOrdini!: number;
    resp!: ListOrderDTO;
    list!: Array<OrderDTO>;
    command!: SearchOrdersCommand;

    constructor(public orderService: OrdersService) {
        super();
    }

    async startSearch(filtri?: SearchOrdersCommand) {
        if (!!filtri) {
            this.command = filtri;
            await this.startSearch();
        } else if (!!this.command) {
            this.resp = await firstValueFrom(this.orderService.searchOrders(this.command));
        } else {
            this.command = new SearchOrdersCommand();
            await this.startSearch();
        }
        this.totOrdini = this.resp.totOrdini;
        return this.resp.list;
    }


    async goToPage(event: any) {
        this.command.current = await super.changePaginatorValue(this.command, event, this.totOrdini);
    }

    override async changePageSize(event: any) {
        this.command.take = +event.target.value;
        this.command.current = 0;
        this.list = await this.startSearch();
    }

}