import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminProductsPageRoutingModule } from './admin-products-routing.module';

import { AdminProductsPage } from './admin-products.page';
import { TableModule } from 'src/app/components/table/table.module';
import { PaginatorModule } from 'src/app/components/paginator/paginator.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminProductsPageRoutingModule,
    TableModule, 
    PaginatorModule,
    ReactiveFormsModule
  ],
  declarations: [AdminProductsPage]
})
export class AdminProductsPageModule {}
