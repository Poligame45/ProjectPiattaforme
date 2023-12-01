import { StoredProductService } from './../Services/stored-product.service';
import { Component, Input, OnInit } from '@angular/core';
import { SearchCommandStoredProduct } from '../models/command/SearchCommandStoredProduct';
import { StoredProduct } from '../models/StoredProduct';
import { firstValueFrom } from 'rxjs';
import { Utility } from '../utils/Utility';
import { ActivatedRoute, ActivatedRouteSnapshot, Route } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage extends Utility implements OnInit {

  constructor(storedProductService: StoredProductService) {
    super(storedProductService);
  }

  async ngOnInit(): Promise<void> {
    this.list = await super.loadProducts();
    console.log(this.list)
  }

  async changePage(event: any) {
    this.list = await super.changePaginatorValue(event);
  }



}
