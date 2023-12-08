import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { BasketService } from 'src/app/Services/basket.service';
import { StoredProductService } from 'src/app/Services/stored-product.service';
import { StoredProduct } from 'src/app/models/StoredProduct';
import { AddUpdateBasketItemCommand } from 'src/app/models/command/basketCommand/AddUpdateBasketItemCommand';
import { SearchCommandStoredProduct } from 'src/app/models/command/storedProductCommand/SearchCommandStoredProduct';
import { Utility } from 'src/app/utils/Utility';

@Component({
  selector: 'main-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {

  currentUser!: any;

  @Input() list!: Array<StoredProduct>;

  constructor(private basketService: BasketService, private router:Router) {
  }
  ngOnInit(): void {
    this.currentUser = sessionStorage.getItem('userId');
  }

  async aggiungiAlCarrello(product: StoredProduct) {
    const command: AddUpdateBasketItemCommand = {
      codiceCustomer: this.currentUser,
      codiceStoredProduct: product.codice,
      quantita: 1
    }

    const resp = await firstValueFrom(this.basketService.addItemInBasket(command));
  }

  goToDetails(prodotto: StoredProduct) {
    this.router.navigate(['product-details'], { queryParams: { product: prodotto.codice} });
  }

}
