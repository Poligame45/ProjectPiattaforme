import { firstValueFrom } from 'rxjs';
import { UserInfoService } from './../../Services/user-info.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GetDeleteUserInfoCommand } from 'src/app/models/command/userCommand/GetDeleteUserInfoCommand';
import { UserDTO } from 'src/app/models/dto/userDTO/userDTO';

@Component({
  selector: 'app-user-request',
  templateUrl: './user-request.page.html',
  styleUrls: ['./user-request.page.scss'],
})
export class UserRequestPage implements OnInit {
  myForm!: FormGroup;
  user!: UserDTO;
  constructor(private router: Router, private userInfoService: UserInfoService) { }

  async ngOnInit() {
    this.configForm();
    const userId = sessionStorage.getItem('userId');
    const command: GetDeleteUserInfoCommand = {
      codice: +userId!!
    }
    this.user = await firstValueFrom(this.userInfoService.getUserInfo(command));
    this.setForm();
  }

  configForm() {
    this.myForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      request: new FormControl('', Validators.required)
    });
  }

  setForm(){
    this.myForm.setValue({
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      email: this.user.email,
      request: ""
    });
  }

  goBack() {
    this.router.navigate(['user-details']);
  }

  goToHome() {
    this.router.navigate(['home']);
  }
}
