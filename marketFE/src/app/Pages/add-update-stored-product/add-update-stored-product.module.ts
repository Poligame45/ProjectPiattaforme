import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddUpdateStoredProductPageRoutingModule } from './add-update-stored-product-routing.module';

import { AddUpdateStoredProductPage } from './add-update-stored-product.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    AddUpdateStoredProductPageRoutingModule
  ],
  declarations: [AddUpdateStoredProductPage]
})
export class AddUpdateStoredProductPageModule { }
