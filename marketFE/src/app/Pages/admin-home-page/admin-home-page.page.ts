import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home-page',
  templateUrl: './admin-home-page.page.html',
  styleUrls: ['./admin-home-page.page.scss'],
})
export class AdminHomePagePage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  goToOrders(){
    this.router.navigate(['admin-orders']);
  }
  goToProducts(){
    this.router.navigate(['admin-products']);
  }

  goToHome(){
    this.router.navigate(['home']);
  }
}
