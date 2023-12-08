import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { StoredProductService } from 'src/app/Services/stored-product.service';
import { GetDeleteStoredProductCommand } from 'src/app/models/command/storedProductCommand/GetDeleteStoredProductCommand';
import { firstValueFrom } from 'rxjs';
import { StoredProduct } from 'src/app/models/StoredProduct';
import { AddUpdateBasketItemCommand } from 'src/app/models/command/basketCommand/AddUpdateBasketItemCommand';
import { BasketService } from 'src/app/Services/basket.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  storedProd!: StoredProduct;
  currentUser!:any;

  constructor(private activatedRoute: ActivatedRoute, private productService: StoredProductService, private basketService:BasketService) { }

  async ngOnInit() {
    this.currentUser = sessionStorage.getItem('userId');
    let codiceProdotto = await this.activatedRoute.snapshot.queryParamMap.get('product');
    const command: GetDeleteStoredProductCommand = {
      codice: codiceProdotto
    }
    this.storedProd = await firstValueFrom(this.productService.getStoredProduct(command));
  }

  async aggiungiAlCarrello(product: StoredProduct) {
    const command: AddUpdateBasketItemCommand = {
      codiceCustomer: this.currentUser,
      codiceStoredProduct: product.codice,
      quantita: 1
    }
    const resp = await firstValueFrom(this.basketService.addItemInBasket(command));
    console.log(resp)
  }

}
