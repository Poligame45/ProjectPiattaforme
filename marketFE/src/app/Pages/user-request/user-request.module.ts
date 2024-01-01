import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserRequestPageRoutingModule } from './user-request-routing.module';

import { UserRequestPage } from './user-request.page';
import { FooterModule } from 'src/app/components/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserRequestPageRoutingModule,
    ReactiveFormsModule,
    FooterModule
  ],
  declarations: [UserRequestPage]
})
export class UserRequestPageModule {}
