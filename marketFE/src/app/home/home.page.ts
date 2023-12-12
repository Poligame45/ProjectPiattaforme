import { StoredProductService } from './../Services/stored-product.service';
import { Component, Input, OnInit } from '@angular/core';
import { Utility } from '../utils/Utility';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchCommandStoredProduct } from '../models/command/storedProductCommand/SearchCommandStoredProduct';
import { ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { BasketService } from '../Services/basket.service';
import { GetBasketCommand } from '../models/command/basketCommand/GetBasketCommand';
import { Basket } from '../models/Basket';
import { firstValueFrom } from 'rxjs';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage extends Utility implements OnInit {
  isLogged!: boolean

  constructor(storedProductService: StoredProductService, private activatedRoute: ActivatedRoute, private basketService: BasketService) {
    super(storedProductService);
  }

  async ngOnInit(): Promise<void> {
    this.list = await super.startSearch();
    if (!!sessionStorage.getItem('userId')) {
      const command: GetBasketCommand = {
        customerId: sessionStorage.getItem('userId')
      }
      const basket = await firstValueFrom(this.basketService.getBasket(command));
      this.basketService.item.next(basket.basketItems.length);
    }

  }

  async changePage(event: any) {
    this.list = await super.changePaginatorValue(event);
  }

  async searchProducts(command: SearchCommandStoredProduct) {
    this.list = await this.startSearch(command);
  }

  async changeSize(event: any) {
    console.log(event.target.value);
    this.command.take = event.target.value;
    this.command.current = 0;
    this.list = await this.startSearch();
  }


}
