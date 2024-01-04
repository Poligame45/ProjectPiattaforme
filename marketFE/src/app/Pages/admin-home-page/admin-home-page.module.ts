import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminHomePagePageRoutingModule } from './admin-home-page-routing.module';

import { AdminHomePagePage } from './admin-home-page.page';
import { FooterModule } from 'src/app/components/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminHomePagePageRoutingModule,
    FooterModule
  ],
  declarations: [AdminHomePagePage]
})
export class AdminHomePagePageModule {}
