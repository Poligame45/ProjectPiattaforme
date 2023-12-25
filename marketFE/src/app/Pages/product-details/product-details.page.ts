import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { StoredProductService } from 'src/app/Services/stored-product.service';
import { GetDeleteStoredProductCommand } from 'src/app/models/command/storedProductCommand/GetDeleteStoredProductCommand';
import { firstValueFrom } from 'rxjs';
import { StoredProduct } from 'src/app/models/StoredProduct';
import { AddUpdateBasketItemCommand } from 'src/app/models/command/basketCommand/AddUpdateBasketItemCommand';
import { BasketService } from 'src/app/Services/basket.service';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  storedProd!: StoredProduct;
  currentUser!: any;
  isToastOpen: boolean = false;

  constructor(private loginService: LoginService, private activatedRoute: ActivatedRoute, private productService: StoredProductService, private basketService: BasketService, private router: Router) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.searchProduct();
      }
    });
  }

  ngOnInit() {
  }

  async searchProduct() {
    this.currentUser = sessionStorage.getItem('userId');
    let codiceProdotto = await this.activatedRoute.snapshot.queryParamMap.get('product');
    const command: GetDeleteStoredProductCommand = {
      codice: codiceProdotto,
    }
    this.storedProd = await firstValueFrom(this.productService.getStoredProduct(command));
  }

  async aggiungiAlCarrello(product: StoredProduct) {
    const command: AddUpdateBasketItemCommand = {
      codiceCustomer: this.currentUser,
      codiceStoredProduct: product.codice,
      quantita: 1
    }
    const resp = await firstValueFrom(this.basketService.addItemInBasket(command));
    console.log(resp)
  }



  goBack() {
    this.router.navigate(['/home']);
  }

  userLogged(): boolean {
    if (this.loginService.getCurrentUser()) {
      return true;
    }
    return false;
  }

  logout() {
    this.loginService.logout();
    location.reload();
  }

  login() {
    this.router.navigate(['user-details']);
  }

  async setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
    await this.aggiungiAlCarrello(this.storedProd);
  }

  goToBasket(){
    this.router.navigate(['basket']);
  }
}
