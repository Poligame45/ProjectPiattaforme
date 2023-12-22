import { StoredProductService } from './../Services/stored-product.service';
import { Component, Input, OnInit } from '@angular/core';
import { Utility } from '../utils/Utility';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SearchCommandStoredProduct } from '../models/command/storedProductCommand/SearchCommandStoredProduct';
import { ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { BasketService } from '../Services/basket.service';
import { GetBasketCommand } from '../models/command/basketCommand/GetBasketCommand';
import { Basket } from '../models/Basket';
import { every, firstValueFrom } from 'rxjs';
import { StoredProductUtility } from '../utils/StoredProductUtility';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage extends StoredProductUtility implements OnInit {
  isLogged!: boolean
  previousUrl!: String;
  constructor(storedProductService: StoredProductService, private router: Router, private basketService: BasketService) {
    super(storedProductService);
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.updateBasket();
      }
    });

  }

  async ngOnInit(): Promise<void> {
    this.list = await super.startSearch();


  }

  async updateBasket() {
    if (!!sessionStorage.getItem('userId')) {
      const command: GetBasketCommand = {
        customerId: sessionStorage.getItem('userId')
      }
      const basket = await firstValueFrom(this.basketService.getBasket(command));
      this.basketService.item.next(basket.basketItems.length);
    }
  }
  async changePage(event: any) {
    await super.goToPage(event, this.totProdotti);
    this.list = await super.startSearch();
  }

  async searchProducts(command: SearchCommandStoredProduct) {
    this.list = await this.startSearch(command);
  }

  async changeSize(event: any) {
    await super.changePageSize(event);
  }


}
