import { StoredProductService } from "../Services/stored-product.service";
import { firstValueFrom } from 'rxjs';
import { SearchCommandStoredProduct } from "../models/command/SearchCommandStoredProduct";
import { ListStoredProductsDTO } from "../models/dto/ListStoredProductsDTO";
import { PaginatorModel } from "../models/PaginatorModel";

export class Utility {
    paginator: PaginatorModel = new PaginatorModel();
    totProdotti!: number;
    resp!: ListStoredProductsDTO;
    list!: any;
    constructor(public storedProductService: StoredProductService) { }

    async startSearch(take: number, current: number) {
        let commandSearch: SearchCommandStoredProduct = new SearchCommandStoredProduct();
        commandSearch.current = current;
        commandSearch.take = take;
        this.resp = await firstValueFrom(this.storedProductService.search(commandSearch));
        console.log(this.resp.storedProductList)
        return this.resp.storedProductList;

    }

    async loadProducts() {
        await this.startSearch(this.paginator.take, this.paginator.current);
        this.totProdotti = this.resp.totProdotti;
        return this.resp.storedProductList;
    }

    async changePaginatorValue(event: any) {
        switch (event) {
            case 1: {
                await this.goToFirstPage();
                return this.resp.storedProductList;
            }
            case 2: {
                await this.goToPreviousPage();
                return this.resp.storedProductList;

            }
            case 3: {
                await this.goToNextPage();
                return this.resp.storedProductList;
            }
            case 4: {
                await this.goToLastPage();
                return this.resp.storedProductList;
            }
            default: {
                return this.resp.storedProductList;
            }
        }
    }

    async goToLastPage() {
        if (this.paginator.current === Math.floor(this.totProdotti / this.paginator.take)) return;
        this.paginator.current = Math.floor(this.totProdotti / this.paginator.take);
        console.log(this.paginator.current);

        await this.startSearch(this.paginator.take, this.paginator.current);
    }

    async goToNextPage() {
        if (this.paginator.take < this.totProdotti / (this.paginator.current + 1)) {
            this.paginator.current = this.paginator.current + 1;
            console.log(this.paginator.current);
            await this.startSearch(this.paginator.take, this.paginator.current);

        } else {
            return;
        }

    }
    async goToPreviousPage() {
        if (this.paginator.current === 0) return;
        this.paginator.current = this.paginator.current - 1;
        console.log(this.paginator.current);
        await this.startSearch(this.paginator.take, this.paginator.current);
    }

    async goToFirstPage() {
        if (this.paginator.current == 0) return;
        this.paginator.current = 0;
        console.log(this.paginator.current);

        await this.startSearch(this.paginator.take, this.paginator.current);
    }


}