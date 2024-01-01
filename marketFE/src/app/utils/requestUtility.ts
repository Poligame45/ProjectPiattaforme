import { firstValueFrom } from "rxjs";
import { SearchRequestCommand } from "../models/command/requestCommand/searchRequestCommand";
import { Utility } from "./Utility";
import { RequestService } from "../Services/request.service";
import { ListRequestDTO } from "../models/dto/request/listRequestDTO";
import { RequestDTO } from "../models/dto/request/requestDTO";

export class RequestUtility extends Utility{
    command!: SearchRequestCommand;
    resp!: ListRequestDTO;
    totRequest!:number;
    list!: Array<RequestDTO>;

    constructor(private requestService:RequestService){
        super();
    }
    
    async startSearch(filtri?: SearchRequestCommand) {
        if (!!filtri) {
            this.command = filtri;
            await this.startSearch();
        } else if (!!this.command) {
            this.resp = await firstValueFrom(this.requestService.search(this.command));
        } else {
            this.command = new SearchRequestCommand();
            await this.startSearch();
        }
        this.totRequest = this.resp.totRequest;
        return this.resp.list;
    }

    async goToPage(event: any, totRequest: number) {
        this.command.current = await super.changePaginatorValue(this.command, event, totRequest);
    }

    override async changePageSize(event: any) {
        this.command.take = +event.target.value;
        this.command.current = 0;
        this.list = await this.startSearch();
    }
    
}