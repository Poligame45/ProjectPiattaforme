import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormRecord, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  myForm!: FormGroup;
  token!: any;
  

  constructor(private serviceRegister: LoginService, private router:Router, private activatedRoute:ActivatedRoute) { }
  // Far vedere altri campi da visualizzare? Es. indirizzo ecc ecc con autocomplete solo FE?
  // Bisogna aggiungere i controlli riguardanti 
  // Email già registrata? O se ne occupa già il DB dato che il campo è unique
  // Le due password inserite nei rispettivi campi sono diverse
  //Controllare formato EMAIL
  //Sfruttare questo form anche per la modifica dei dati


  ngOnInit() {
    this.myForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      address: new FormControl('',Validators.required),
      email: new FormControl('', Validators.required),
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

    if (this.myForm.invalid) {
      console.log('form invalido');
    }

    this.token = await firstValueFrom(this.serviceRegister.register(obj));
    sessionStorage.setItem("token", this.token.accessToken);
    sessionStorage.setItem("userId",this.token.user.id);
    sessionStorage.setItem("userRole",this.token.user.role);

    //Naviga verso una pagina 
  }

  goToLoginPage(){
    this.router.navigate(['login']);
  }

}
