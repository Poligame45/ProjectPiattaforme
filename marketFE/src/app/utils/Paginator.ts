import { StoredProductService } from "../Services/stored-product.service";
import { Utility } from "./Utility";

export class Paginator extends Utility {
    //Fixare comportamento del paginatore prevedendo di disabilitare i pulsanti e di abilitarli a seconda dei
    //valori hasNext, hasPrevious ecc.
    constructor(storedProductService: StoredProductService) {
        super(storedProductService);
        this.paginator.hasPrevious = false;
    }
    changePaginatorValue(event: any) {
        switch (event) {
            case 1: {
                this.goToFirstPage();
                break;
            }
            case 2: {
                this.goToPreviousPage();
                break;
            }
            case 3: {
                this.goToNextPage();
                break;
            }
            case 4: {
                this.goToLastPage();
                break;
            }
            default: {
                break;
            }
        }
    }

    goToLastPage() {
        if (  this.paginator.current == this.totProdotti / this.paginator.current) return;
        this.paginator.current = this.totProdotti /(this.paginator.take );
        this.paginator.take = 10;
        this.paginator.hasNext = false;
        console.log(this.paginator);

    }
    goToNextPage() {
        if (this.paginator.hasNext || (this.paginator.current == 0 && this.totProdotti>this.paginator.take)) {
            this.paginator.current = this.paginator.current + 1;
            this.paginator.take = 10;
            this.paginator.hasPrevious = true;
            if(this.paginator.current <= this.totProdotti / this.paginator.current + 1 ){
                this.paginator.hasNext = false;
            }
        }
        console.log(this.paginator);

    }
    goToPreviousPage() {
        if (this.paginator.hasPrevious == false || this.paginator.current == 0) return;
        this.paginator.current = this.paginator.current - 1;
        this.paginator.take = 10;
        this.paginator.hasNext = true;
        console.log(this.paginator);

    }
    goToFirstPage() {
        if (this.paginator.current == 0) {
            this.paginator.hasPrevious = false;
        }
        this.paginator.current = 0;
        this.paginator.take = 10;
        this.paginator.hasPrevious = false;
        console.log(this.paginator);
    }

}