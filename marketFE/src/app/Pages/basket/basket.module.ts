import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BasketPageRoutingModule } from './basket-routing.module';

import { BasketPage } from './basket.page';
import { PaginatorModule } from 'src/app/components/paginator/paginator.module';
import { FooterModule } from 'src/app/components/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BasketPageRoutingModule,
    PaginatorModule,
    ReactiveFormsModule,
    FormsModule,
    FooterModule
  ],
  declarations: [BasketPage]
})
export class BasketPageModule {}
