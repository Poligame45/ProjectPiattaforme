import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BasketPageRoutingModule } from './basket-routing.module';

import { BasketPage } from './basket.page';
import { PaginatorModule } from 'src/app/components/paginator/paginator.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BasketPageRoutingModule,
    PaginatorModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [BasketPage]
})
export class BasketPageModule {}
