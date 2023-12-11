import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { BasketService } from 'src/app/Services/basket.service';
import { StoredProduct } from 'src/app/models/StoredProduct';
import { AddUpdateBasketItemCommand } from 'src/app/models/command/basketCommand/AddUpdateBasketItemCommand';
import { GetBasketCommand } from 'src/app/models/command/basketCommand/GetBasketCommand';

@Component({
  selector: 'main-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {

  currentUser!: number;
  @Input() list!: Array<StoredProduct>;

  constructor(private basketService: BasketService, private router: Router) {
  }
  ngOnInit(): void {
  }

  async aggiungiAlCarrello(product: StoredProduct) {
    const command: AddUpdateBasketItemCommand = {
      codiceCustomer: this.currentUser,
      codiceStoredProduct: product.codice,
      quantita: 1
    }
    await firstValueFrom(this.basketService.addItemInBasket(command));
    const getCommand: GetBasketCommand = {
      customerId: this.currentUser
    }
    const basket = await firstValueFrom(this.basketService.getBasket(getCommand));
    this.basketService.item.next(basket.basketItems.length);
  }

  goToDetails(prodotto: StoredProduct) {
    this.router.navigate(['product-details'], { queryParams: { product: prodotto.codice } });
  }

  userLogged() {
    this.currentUser = +sessionStorage.getItem('userId')!!;
    return this.currentUser!!
  }
}
