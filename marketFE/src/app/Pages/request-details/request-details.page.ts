import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { RequestService } from 'src/app/Services/request.service';
import { GetDeleteRequestCommand } from 'src/app/models/command/requestCommand/getDeleteRequestCommand';
import { RequestDTO } from 'src/app/models/dto/request/requestDTO';

@Component({
  selector: 'request-details',
  templateUrl: './request-details.page.html',
  styleUrls: ['./request-details.page.scss'],
})
export class RequestDetailsPage implements OnInit {
  myForm!: FormGroup;
  request!:RequestDTO;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private serviceRequest: RequestService) {
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      idReq: new FormControl('', Validators.required),
      customerId: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
    });
    this.config();
  }

  async config() {
    let codiceRequest = await this.activatedRoute.snapshot.queryParamMap.get('request');
    const command: GetDeleteRequestCommand = {
      codice: +codiceRequest!,
    }
    this.request = await firstValueFrom(this.serviceRequest.getRequest(command));
    this.myForm.setValue({
      firstname: this.request.customer.firstname,
      lastname: this.request.customer.lastname,
      idReq: this.request.id,
      customerId: this.request.customer.id,
      email: this.request.customer.email,
      content: this.request.content
    })
  }

  goBack(){
    this.router.navigate(['admin-request']);
  }
  goToHome(){
    this.router.navigate(['admin-home-page']);
  }
}
