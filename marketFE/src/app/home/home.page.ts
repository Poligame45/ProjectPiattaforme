import { StoredProductService } from './../Services/stored-product.service';
import { Component, OnInit } from '@angular/core';
import { Paginator } from '../utils/Paginator';
import { GetCommandProduct } from '../models/command/GetCommandProduct';
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
    //Prove
    let prodotto: StoredProduct = {
      descrizione: "prova",
      img: "",
      prezzo: 15.5,
      qta: 3
    }
    this.resp = await firstValueFrom(this.storedProductService.addProduct(prodotto));
  }

  async changePage(event: any) {
    super.changePaginatorValue(event);
    this.list = await super.loadProducts();

  }



}
