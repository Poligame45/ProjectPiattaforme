import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerOrdersPageRoutingModule } from './customer-orders-routing.module';

import { CustomerOrdersPage } from './customer-orders.page';
import { TableModule } from 'src/app/components/table/table.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerOrdersPageRoutingModule,
    TableModule
  ],
  declarations: [CustomerOrdersPage]
})
export class CustomerOrdersPageModule {}
