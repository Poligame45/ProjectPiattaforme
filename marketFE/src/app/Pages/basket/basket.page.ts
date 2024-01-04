import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IonAlert, SelectChangeEventDetail } from '@ionic/angular';
import { IonSelectCustomEvent } from '@ionic/core';
import { firstValueFrom } from 'rxjs';
import { BasketService } from 'src/app/Services/basket.service';
import { Basket } from 'src/app/models/Basket';
import { BasketItem } from 'src/app/models/BasketItem';
import { StoredProduct } from 'src/app/models/StoredProduct';
import { AddUpdateBasketItemCommand } from 'src/app/models/command/basketCommand/AddUpdateBasketItemCommand';
import { GetBasketCommand } from 'src/app/models/command/basketCommand/GetBasketCommand';
import { GetDeleteBasketItemCommand } from 'src/app/models/command/basketCommand/GetDeleteBasketItemCommand';
import { AddUpdateOrderCommand } from 'src/app/models/command/orderCommand/addUpdateOrderCommand';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.page.html',
  styleUrls: ['./basket.page.scss'],
})
export class BasketPage implements OnInit {
  basket: Basket = new Basket();
  totaleCarrello: number = 0;
  showEmptyBasket: boolean = false;
  @ViewChild('alertCustomer') alert!: IonAlert;
  @ViewChild('alertBasket') alertBasket!: IonAlert;


  async changeSizeOfPages(event: IonSelectCustomEvent<SelectChangeEventDetail<any>>, item: BasketItem) {
    const command: AddUpdateBasketItemCommand = {
      codiceCustomer: item.carrello.id,
      codiceStoredProduct: item.storedProduct.codice,
      quantita: event.target.value
    }
    await firstValueFrom(this.basketService.updateBasketItemQuantity(command));
    await this.startSearch();
  }

  constructor(private basketService: BasketService, private router: Router) {
    this.router.events.subscribe(async (ev) => {
      if (ev instanceof NavigationEnd) {
        await this.startSearch();
      }
    });
  }


  ngOnInit() {
  }

  async startSearch() {
    this.totaleCarrello = 0;
    let command = new GetBasketCommand();
    command.customerId = sessionStorage.getItem('userId');
    this.basket = await firstValueFrom(this.basketService.getBasket(command));

    let basketLen = this.basket.basketItems.length;
    for (let i = 0; i < this.basket.basketItems.length; i++) {
      let basketItem = this.basket.basketItems[i];
      if (basketItem.storedProduct.qta <= 0) {
        basketLen = basketLen - 1;
        break;
      }
      this.totaleCarrello = this.totaleCarrello + (basketItem.quantita * basketItem.storedProduct.prezzo);
    }
    this.basketService.item.next(basketLen);
    this.basket.basketItems.length <= 0 ? this.showEmptyBasket = true : this.showEmptyBasket = false;
  }


  async rimuoviItem(item: BasketItem) {
    const command: GetDeleteBasketItemCommand = {
      codiceCustomer: sessionStorage.getItem('userId'),
      codiceStoredProduct: item.storedProduct.codice
    }
    this.basket = await firstValueFrom(this.basketService.removeBasketItem(command));
    this.startSearch();
  }


  goToHome() {
    this.router.navigate(['home']);
  }

  async acquista() {
    const command: AddUpdateOrderCommand = new AddUpdateOrderCommand();
    let elem = sessionStorage.getItem('userId');
    command.customerId = +elem!
    await firstValueFrom(this.basketService.acquista(command));
    this.alertBasket.message="Ordine effettuato correttamente!"
    this.alertBasket.present();
    setTimeout(() => { this.alertBasket.dismiss(); }, 1500);
  }

  goBack() {
    this.router.navigate(['user-details']);
  }

  goToOrders() {
    this.router.navigate(['customer-orders']);
  }

  productsNotAvailable() {
    for (let i = 0; i < this.basket.basketItems.length; i++) {
      let basketItem = this.basket.basketItems[i];
      if (basketItem.storedProduct.qta <= 0) { return true; }
    }
    return false;
  }

  goToStoredProduct(prodotto: StoredProduct) {
    if (prodotto.qta > 0) {
      this.router.navigate(['product-details'], { queryParams: { product: prodotto.codice } });
    }else{
      this.alert.message="Il prodotto non è disponibile!"
      this.alert.present();
      setTimeout(() => { this.alert.dismiss(); }, 1500);
    }
  }

  reload(){
    location.reload();
  }

}
