import { StoredProductService } from './../Services/stored-product.service';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SearchCommandStoredProduct } from '../models/command/storedProductCommand/SearchCommandStoredProduct';
import { BasketService } from '../Services/basket.service';
import { GetBasketCommand } from '../models/command/basketCommand/GetBasketCommand';
import { firstValueFrom } from 'rxjs';
import { StoredProductUtility } from '../utils/StoredProductUtility';
import { FormControl, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage extends StoredProductUtility implements OnInit {
  myForm!: FormGroup;
  filtri: SearchCommandStoredProduct = new SearchCommandStoredProduct();

  constructor(storedProductService: StoredProductService, private router: Router, private basketService: BasketService) {
    super(storedProductService);
    this.router.events.subscribe(async (ev) => {
      if (ev instanceof NavigationEnd) {
        this.list = await super.startSearch();
        if (sessionStorage.getItem('userRole') === "CUSTOMER") {
          this.updateBasket();
        }
      }
    });

  }
  configForm() {
    this.myForm = new FormGroup({
      prezzo: new FormControl(),
      descrizione: new FormControl(),
      qta: new FormControl(),
    });
  }

  async onSubmit() {
    this.filtri.prezzo = this.myForm.value.prezzo;
    this.filtri.qta = this.myForm.value.qta;
    this.filtri.descrizione = this.myForm.value.descrizione;
    this.filtri.deleted = false;
    this.list = await super.startSearch(this.filtri);
  }

  async rimuoviFiltri() {
    this.filtri = new SearchCommandStoredProduct();
    this.filtri.deleted = false;
    this.myForm.reset();
    this.list = await super.startSearch(this.filtri);
  }

  async ngOnInit(): Promise<void> {
    this.configForm();

  }

  async updateBasket() {
    const userRole = sessionStorage.getItem('userRole');
    if (!!sessionStorage.getItem('userId')) {
      const command: GetBasketCommand = {
        customerId: sessionStorage.getItem('userId')
      }
      if (userRole != "ADMIN") {
        const basket = await firstValueFrom(this.basketService.getBasket(command));
        this.basketService.item.next(basket.basketItems.length);
      }
    }
  }
  async changePage(event: any) {
    await super.goToPage(event, this.totProdotti);
    this.list = await super.startSearch();
  }

  async searchProducts(command: SearchCommandStoredProduct) {
    this.filtri.nome = command.nome;
    this.list = await this.startSearch(this.filtri);
  }

  async changeSize(event: any) {
    await super.changePageSize(event);
  }
}
