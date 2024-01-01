import { Component, EventEmitter,  OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSearchbar } from '@ionic/angular';
import { BasketService } from 'src/app/Services/basket.service';
import { LoginService } from 'src/app/Services/login.service';
import { SearchCommandStoredProduct } from 'src/app/models/command/storedProductCommand/SearchCommandStoredProduct';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() searchBarEvent: EventEmitter<any> = new EventEmitter();
  @Output() resetEvent: EventEmitter<any> = new EventEmitter();
  @ViewChild(IonSearchbar) searchBar!: IonSearchbar;

  constructor(private router: Router, private loginService: LoginService, private basketService: BasketService) { }

  basketItems: number = 0;

  async ngOnInit() {

  }

  getBasketItems() {
    this.basketService.item.subscribe((val) => this.basketItems = val);
    return this.basketItems > 0;
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

  goToHome() {
    this.router.navigate(['home']);
  }
  goToBasket() {
    this.router.navigate(['basket']);
  }

  handleInput(event: any) {
    const command: SearchCommandStoredProduct = new SearchCommandStoredProduct();
    command.nome = event.target.value;
    this.searchBarEvent.emit(command);
  }

  resetFiltri(){
    this.searchBar.value = null;
    this.resetEvent.emit();
  }

  adminLogged() {
    return sessionStorage.getItem('userRole')!! === "ADMIN";
  }
  goAdminHomePage(){
    this.router.navigate(['admin-home-page']);
  }

  goAboutUs(){
    this.router.navigate(['about-us']);
  }
}
