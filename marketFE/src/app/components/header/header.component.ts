import { Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { BasketService } from 'src/app/Services/basket.service';
import { LoginService } from 'src/app/Services/login.service';
import { SearchCommandStoredProduct } from 'src/app/models/command/storedProductCommand/SearchCommandStoredProduct';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  myForm!: FormGroup;
  @Output() searchBarEvent: EventEmitter<any> = new EventEmitter();
  
  constructor(private serviceLogin: LoginService, private router: Router, private loginService: LoginService, private basketService: BasketService) { }

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
    this.serviceLogin.logout();
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


}
