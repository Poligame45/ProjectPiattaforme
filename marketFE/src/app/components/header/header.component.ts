import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import { StoredProductService } from 'src/app/Services/stored-product.service';
import { SearchCommandStoredProduct } from 'src/app/models/command/SearchCommandStoredProduct';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  myForm!: FormGroup;
  @Input() isLogged!: boolean;
  @Output() searchBarEvent: EventEmitter<any> = new EventEmitter();
  constructor(private serviceLogin: LoginService, private router: Router, private storedProductService: StoredProductService) { }

  ngOnInit() {

  }

  logout() {
    this.serviceLogin.logout();
    location.reload();
  }

  login() {
    this.router.navigate(['login']);
  }

  handleInput(event: any) {
    const command: SearchCommandStoredProduct = new SearchCommandStoredProduct();
    command.nome = event.target.value;
    this.searchBarEvent.emit(command);
  }


}
