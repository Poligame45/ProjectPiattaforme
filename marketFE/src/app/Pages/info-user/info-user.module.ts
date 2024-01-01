import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoUserPageRoutingModule } from './info-user-routing.module';

import { InfoUserPage } from './info-user.page';
import { FooterModule } from 'src/app/components/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoUserPageRoutingModule,
    ReactiveFormsModule,
    FooterModule
  ],
  declarations: [InfoUserPage]
})
export class InfoUserPageModule {}
