import { StoredProductService } from './../Services/stored-product.service';
import { Component, OnInit } from '@angular/core';
import { Paginator } from '../utils/Paginator';
import { SearchCommandStoredProduct } from '../models/command/SearchCommandStoredProduct';
import { StoredProduct } from '../models/StoredProduct';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage extends Paginator implements OnInit {
  list!: any;
  constructor(storedProductService: StoredProductService) {
    super(storedProductService);
  }

  async ngOnInit(): Promise<void> {
    this.list = await super.loadProducts();
    // Prove
    // let prodotto: StoredProduct = {
    //   nome:"prod452",
    //   descrizione: "prodotto 452",
    //   img: "",
    //   prezzo: 20.5,
    //   qta: 10
    // }
    // this.resp = await firstValueFrom(this.storedProductService.addProduct(prodotto));
  }

  async changePage(event: any) {
    super.changePaginatorValue(event);
    this.list = await super.loadProducts();
  }



}
