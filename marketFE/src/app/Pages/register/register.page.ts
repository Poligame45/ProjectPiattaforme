import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormRecord, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { LoginService } from 'src/app/Services/login.service';
import { UserDTO } from 'src/app/models/dto/userDTO/userDTO';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  myForm!: FormGroup;
  token!: any;
  regexp = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  regex: boolean = false;
  adminLogged: boolean = false;
  isAlertOpen: boolean = false;
  isAlertAdminOpen:boolean = false;

  constructor(private serviceRegister: LoginService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.subscribe(async (ev) => {
      if (ev instanceof NavigationEnd) {
        this.checkAdmin();
      }
    });
  }


  checkAdmin() {
    if (sessionStorage.getItem('userRole') === 'ADMIN') {
      this.adminLogged = true;
    } else {
      this.adminLogged = false;
    }
  }
  ngOnInit() {

    this.myForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      email: new FormControl('', Validators.pattern(this.regexp)),
      password: new FormControl('', Validators.required),
      cpassword: new FormControl('', Validators.required)
    });
  }

  async onSubmit() {
    if (this.myForm.value.password != this.myForm.value.cpassword) {
      alert('password diverse');
      return;
    }
    const obj: any = {
      firstname: this.myForm.value.firstname,
      lastname: this.myForm.value.lastname,
      address: this.myForm.value.address,
      email: this.myForm.value.email,
      password: this.myForm.value.password,
      role: "CUSTOMER"
    }
    this.token = await firstValueFrom(this.serviceRegister.register(obj));
    if (!!this.token) {
      sessionStorage.setItem("token", this.token.accessToken);
      sessionStorage.setItem("userId", this.token.user.id);
      sessionStorage.setItem("userRole", this.token.user.role);
      this.isAlertOpen = true;
    }else{
      this.isAlertOpen = false;
    }
  }

  async registerAdmin() {
    if (this.myForm.value.password != this.myForm.value.cpassword) {
      alert('password diverse');
      return;
    }
    const obj: any = {
      firstname: this.myForm.value.firstname,
      lastname: this.myForm.value.lastname,
      address: this.myForm.value.address,
      email: this.myForm.value.email,
      password: this.myForm.value.password,
      role: "ADMIN"
    }
    const user: UserDTO = await firstValueFrom(this.serviceRegister.registerAdmin(obj));
    if (user!) {
      this.isAlertAdminOpen = true;
    }else{
      this.isAlertAdminOpen = false;
    }
  }

  checkForm(){
    return this.isAlertOpen ? 'present-alert' : '';
  }
  checkAdminForm(){
    return this.isAlertAdminOpen ? 'present-alert-admin' : '';
  }
  goToLoginPage() {
    this.router.navigate(['login']);
  }

  goToHome() {
    this.router.navigate(['home']);
  }
}
