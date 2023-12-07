import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IonSelect, SelectChangeEventDetail } from '@ionic/angular';
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

  async changeSizeOfPages(event: IonSelectCustomEvent<SelectChangeEventDetail<any>>, item: BasketItem) {
    const command: AddUpdateBasketItemCommand = {
      codiceCustomer: item.carrello.id,
      codiceStoredProduct: item.storedProduct.codice,
      quantita: event.target.value
    }
    await firstValueFrom(this.basketService.updateBasketItemQuantity(command));
    await this.startSearch();
  }

  constructor(private basketService: BasketService) { }


  async ngOnInit() {
    await this.startSearch();
  }

  async startSearch() {
    let command = new GetBasketCommand();
    command.codice = sessionStorage.getItem('userId');
    this.basket = await firstValueFrom(this.basketService.getBasket(command));
  }


  async rimuoviItem(item: BasketItem) {
    const command: GetDeleteBasketItemCommand = {
      codiceCustomer: sessionStorage.getItem('userId'),
      codiceStoredProduct: item.storedProduct.codice
    }
    this.basket = await firstValueFrom(this.basketService.removeBasketItem(command));
    this.startSearch();
  }



}

