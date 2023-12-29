import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SelectChangeEventDetail } from '@ionic/angular';
import { IonSelectCustomEvent } from '@ionic/core';
import { firstValueFrom } from 'rxjs';
import { BasketService } from 'src/app/Services/basket.service';
import { Basket } from 'src/app/models/Basket';
import { BasketItem } from 'src/app/models/BasketItem';
import { AddUpdateBasketItemCommand } from 'src/app/models/command/basketCommand/AddUpdateBasketItemCommand';
import { GetBasketCommand } from 'src/app/models/command/basketCommand/GetBasketCommand';
import { GetDeleteBasketItemCommand } from 'src/app/models/command/basketCommand/GetDeleteBasketItemCommand';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.page.html',
  styleUrls: ['./basket.page.scss'],
})
export class BasketPage implements OnInit {
  basket: Basket = new Basket();
  totaleCarrello!: number;
  isAlertOpen: boolean = false;
  showEmptyBasket: boolean = false;

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


  async ngOnInit() {
    await this.startSearch();
  }

  async startSearch() {
    this.totaleCarrello = 0;
    let command = new GetBasketCommand();
    command.customerId = sessionStorage.getItem('userId');
    this.basket = await firstValueFrom(this.basketService.getBasket(command));
    this.basket.basketItems.forEach((basketItem: BasketItem) => {
      if(basketItem.quantita <= 0){this.rimuoviItem(basketItem); return;}
      this.totaleCarrello = this.totaleCarrello + (basketItem.quantita * basketItem.storedProduct.prezzo);
    });
    this.basketService.item.next(this.basket.basketItems.length);
    this.basket.basketItems.length <=0 ? this.showEmptyBasket = true : this.showEmptyBasket=false;
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
    // const command: AddUpdateOrderCommand = new AddUpdateOrderCommand();
    // let elem = sessionStorage.getItem('userId');
    // command.customerId = +elem!
    // await firstValueFrom(this.basketService.acquista(command));
    this.isAlertOpen = true;
  }

  goBack() {
    this.router.navigate(['user-details']);
  }

  goToOrders() {
    this.router.navigate(['customer-orders']);
  }
}
