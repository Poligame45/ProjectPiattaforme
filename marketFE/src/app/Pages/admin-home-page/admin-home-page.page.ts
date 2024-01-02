import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-admin-home-page',
  templateUrl: './admin-home-page.page.html',
  styleUrls: ['./admin-home-page.page.scss'],
})
export class AdminHomePagePage implements OnInit {

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {
  }

  goToOrders() {
    this.router.navigate(['admin-orders']);
  }
  goToProducts() {
    this.router.navigate(['admin-products']);
  }

  goToHome() {
    this.router.navigate(['home']);
  }

  goToRequest() {
    this.router.navigate(['admin-request']);
  }
  logout() {
    this.loginService.logout();
    this.router.navigate(['home']);
  }

  goToRegisterPage(){
    this.router.navigate(['register']);
  }
}
