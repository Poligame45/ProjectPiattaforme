import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { LoginService } from 'src/app/Services/login.service';
import { AuthenticationCommand } from 'src/app/models/command/authCommand/AuthenticationCommand';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  myForm!: FormGroup;
  token!: any;
  constructor(private serviceLogin: LoginService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  async onSubmit() {
    const user: AuthenticationCommand = {
      email: this.myForm.value.email,
      password: this.myForm.value.password
    }
    this.token = await firstValueFrom(this.serviceLogin.login(user));
    if (!!this.token && !!this.token.user) {
      sessionStorage.setItem("token", this.token.accessToken);
      sessionStorage.setItem("userId", this.token.user.id);
      sessionStorage.setItem("userRole", this.token.user.role);
      this.serviceLogin.isLogged = true;
    } else {
      alert('email o password sbagliate');
    }
    if (!!this.serviceLogin.isLogged && this.token.user.role === "CUSTOMER") {
      this.goToHome();
    }else if (!!this.serviceLogin.isLogged && this.token.user.role === "ADMIN"){
      this.goToAdminHomePage();
    }
  }


  goToHome() {
    this.router.navigate(['home'], { queryParams: { isLogged: this.serviceLogin.isLogged } });
  }

  goToAdminHomePage() {
    this.router.navigate(['admin-home-page']);
  }

  goToRegisterPage() {
    this.router.navigate(['register']);
  }


}
