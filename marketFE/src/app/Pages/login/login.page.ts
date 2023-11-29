import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  myForm!: FormGroup;
  token: String = "";

  constructor(private serviceLogin: LoginService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  async onSubmit() {
    const obj: any = {
      email: this.myForm.value.email,
      password: this.myForm.value.password
    }
    if (this.myForm.invalid) {
      console.log('form invalido');
    }
    this.token = await firstValueFrom(this.serviceLogin.register(obj));

  }

  goToRegisterPage() {
    this.router.navigate(['register']);
  }

}
