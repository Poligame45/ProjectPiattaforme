import { StoredProductService } from "../Services/stored-product.service";
import { firstValueFrom } from 'rxjs';
import { SearchCommandStoredProduct } from "../models/command/SearchCommandStoredProduct";
import { ListStoredProductsDTO } from "../models/dto/ListStoredProductsDTO";
import { PaginatorModel } from "../models/PaginatorModel";

export class Utility {
    paginator: PaginatorModel = new PaginatorModel();
    totProdotti!: number;
    resp!: ListStoredProductsDTO;
    constructor(public storedProductService: StoredProductService) { }

    async loadProducts() {
        let commandSearch: SearchCommandStoredProduct = new SearchCommandStoredProduct();
        commandSearch.current = this.paginator.current;
        commandSearch.take = this.paginator.take;
        this.resp = await firstValueFrom(this.storedProductService.searchAll(commandSearch));
        console.log(this.resp);
        this.totProdotti = this.resp.totProdotti;
        return this.resp.storedProductList;
    }

}