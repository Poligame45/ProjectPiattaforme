import { StoredProductService } from './../Services/stored-product.service';
import { Component, Input, OnInit } from '@angular/core';
import { Utility } from '../utils/Utility';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchCommandStoredProduct } from '../models/command/storedProductCommand/SearchCommandStoredProduct';
import { ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage extends Utility implements OnInit, ViewWillLeave {
  isLogged!: boolean

  constructor(storedProductService: StoredProductService, private activatedRoute: ActivatedRoute) {
    super(storedProductService);
  }
  async ionViewWillLeave(): Promise<void> {
    this.activatedRoute.snapshot.queryParamMap.get('isLogged') ? this.isLogged = true : this.isLogged = false;
    this.list = await super.startSearch();

  }

  async ngOnInit(): Promise<void> {
    this.activatedRoute.snapshot.queryParamMap.get('isLogged') ? this.isLogged = true : this.isLogged = false;
    this.list = await super.startSearch();
  }

  async changePage(event: any) {
    this.list = await super.changePaginatorValue(event);
  }

  async searchProducts(command: SearchCommandStoredProduct) {
    this.list = await this.startSearch(command);
    console.log(this.list);
  }

  async changeSize(event: any) {
    console.log(event.target.value);
    this.command.take = event.target.value;
    this.command.current = 0;
    this.list = await this.startSearch();
  }


}
