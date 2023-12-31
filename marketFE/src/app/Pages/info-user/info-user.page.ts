import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { UserInfoService } from 'src/app/Services/user-info.service';
import { GetDeleteUserInfoCommand } from 'src/app/models/command/userCommand/GetDeleteUserInfoCommand';
import { UserDTO } from 'src/app/models/dto/userDTO/userDTO';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.page.html',
  styleUrls: ['./info-user.page.scss'],
})
export class InfoUserPage implements OnInit {
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
    });
  }

  setForm() {
    this.myForm.setValue({
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      email: this.user.email,
    });
  }

  goBack() {
    this.router.navigate(['user-details']);
  }

  goToHome() {
    this.router.navigate(['home']);
  }

}
