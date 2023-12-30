import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserRequestPageRoutingModule } from './user-request-routing.module';

import { UserRequestPage } from './user-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserRequestPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UserRequestPage]
})
export class UserRequestPageModule {}
