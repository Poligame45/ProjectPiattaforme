import { StoredProductService } from "../Services/stored-product.service";
import { firstValueFrom } from 'rxjs';
import { GetCommandProduct } from "../models/command/GetCommandProduct";
import { ListStoredProductsDTO } from "../models/dto/ListStoredProductsDTO";
import { PaginatorModel } from "../models/PaginatorModel";

export class Utility {
    paginator: PaginatorModel = new PaginatorModel();
    totProdotti!: number;
    resp!: ListStoredProductsDTO;
    constructor(public storedProductService: StoredProductService) { }

    async loadProducts() {
        let commandSearch: GetCommandProduct = new GetCommandProduct();
        commandSearch.current = this.paginator.current;
        commandSearch.take = this.paginator.take;
        this.resp = await firstValueFrom(this.storedProductService.getAllProducts(commandSearch));
        this.totProdotti = this.resp.totProdotti;
        return this.resp.storedProductList;
    }

}