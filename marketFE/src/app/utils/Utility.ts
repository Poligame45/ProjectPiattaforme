import { StoredProductService } from "../Services/stored-product.service";
import { firstValueFrom } from 'rxjs';
import { SearchCommandStoredProduct } from "../models/command/storedProductCommand/SearchCommandStoredProduct";
import { ListStoredProductsDTO } from "../models/dto/ListStoredProductsDTO";
import { StoredProduct } from "../models/StoredProduct";

export class Utility {
    totProdotti!: number;
    resp!: ListStoredProductsDTO;
    list!: Array<StoredProduct>;
    command!: SearchCommandStoredProduct;

    constructor(public storedProductService: StoredProductService) { }

    async startSearch(filtri?: SearchCommandStoredProduct) {
        if (!!filtri) {
            this.command = filtri;
            await this.startSearch();
        } else if (!!this.command) {
            this.resp = await firstValueFrom(this.storedProductService.search(this.command));
        } else {
            this.command = new SearchCommandStoredProduct();
            await this.startSearch();
        }
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
        if (this.command.current === Math.floor(this.totProdotti / this.command.take)) return;
        this.command.current = Math.floor(this.totProdotti / this.command.take);
        await this.startSearch();
        console.log(this.command.current);
    }

    async goToNextPage() {
        if (this.command.take < this.totProdotti / (this.command.current + 1)) {
            this.command.current = this.command.current + 1;
            await this.startSearch();
            console.log(this.command.current);

        } else {
            return;
        }

    }
    async goToPreviousPage() {
        if (this.command.current === 0) return;
        this.command.current = this.command.current - 1;
        await this.startSearch();
        console.log(this.command.current);

    }

    async goToFirstPage() {
        if (this.command.current == 0) return;
        this.command.current = 0;
        await this.startSearch();
        console.log(this.command.current);
    }


}