import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  goToBasket(){
    this.router.navigate(['basket']);
  }
  goToHome(){
    this.router.navigate(['home']);
  }

  goToOrders(){
    this.router.navigate(['customer-orders']);
  }
  goToUserRequest(){
    this.router.navigate(['user-request']);
  }

  goToInfo(){
    this.router.navigate(['info-user']);

  }
}
