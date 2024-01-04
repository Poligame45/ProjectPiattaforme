import { firstValueFrom } from 'rxjs';
import { UserInfoService } from './../../Services/user-info.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { GetDeleteUserInfoCommand } from 'src/app/models/command/userCommand/GetDeleteUserInfoCommand';
import { UserDTO } from 'src/app/models/dto/userDTO/userDTO';
import { SearchRequestCommand } from 'src/app/models/command/requestCommand/searchRequestCommand';
import { AddUpdateRequestCommand } from 'src/app/models/command/requestCommand/addUpdateRequestCommand';
import { RequestService } from 'src/app/Services/request.service';
import { IonAlert } from '@ionic/angular';

@Component({
  selector: 'app-user-request',
  templateUrl: './user-request.page.html',
  styleUrls: ['./user-request.page.scss'],
})
export class UserRequestPage implements OnInit {
  myForm!: FormGroup;
  user!: UserDTO;
  @ViewChild('alertCustomer') alert!:IonAlert;

  constructor(private router: Router, private userInfoService: UserInfoService, private requestService: RequestService) {
    this.router.events.subscribe(async (ev) => {
      if (ev instanceof NavigationEnd) {
        this.setForm();
      }
    });
   }

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
      content: new FormControl('', Validators.required)
    });
  }

  setForm() {
    this.myForm.setValue({
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      email: this.user.email,
      content: ""
    });

  }

  goBack() {
    this.router.navigate(['user-details']);
  }

  goToHome() {
    this.router.navigate(['home']);
  }

  async onSubmit() {
    const command: AddUpdateRequestCommand = {
      customerId: this.user.id,
      content: this.myForm.value.content
    }
    const resp = await firstValueFrom(this.requestService.addRequest(command));
    this.alert.present();
    setTimeout(() => { this.alert.dismiss(); }, 1500);
  }

}
