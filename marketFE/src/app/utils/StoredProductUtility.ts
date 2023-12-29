import { firstValueFrom } from "rxjs";
import { StoredProductService } from "../Services/stored-product.service";
import { StoredProduct } from "../models/StoredProduct";
import { SearchCommandStoredProduct } from "../models/command/storedProductCommand/SearchCommandStoredProduct";
import { ListStoredProductsDTO } from "../models/dto/ListStoredProductsDTO";
import { Utility } from "./Utility";

export class StoredProductUtility extends Utility {
    totProdotti!: number;
    resp!: ListStoredProductsDTO;
    list!: Array<StoredProduct>;
    command!: SearchCommandStoredProduct;

    constructor(public storedProductService: StoredProductService) {
        super();
    }

    async startSearch(filtri?: SearchCommandStoredProduct) {
        if (!!filtri) {
            this.command = filtri;
            await this.startSearch();
        } else if (!!this.command) {
            this.command.deleted = false;
            this.resp = await firstValueFrom(this.storedProductService.searchStoredProducts(this.command));
        } else {
            this.command = new SearchCommandStoredProduct();
            this.command.deleted = false;
            await this.startSearch();
        }
        this.totProdotti = this.resp.totProdotti;
        return this.resp.storedProductList;
    }

    async goToPage(event: any, totProdotti: number) {
        this.command.current = await super.changePaginatorValue(this.command, event, totProdotti);
    }
    
    override async changePageSize(event: any) {
        this.command.take = +event.target.value;
        this.command.current = 0;
        this.list = await this.startSearch();
    }
}