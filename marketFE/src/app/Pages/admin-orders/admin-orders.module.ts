import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminOrdersPageRoutingModule } from './admin-orders-routing.module';

import { AdminOrdersPage } from './admin-orders.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TableModule } from 'src/app/components/table/table.module';
import { PaginatorModule } from 'src/app/components/paginator/paginator.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminOrdersPageRoutingModule,
    HeaderModule,
    TableModule,
    PaginatorModule
  ],
  declarations: [AdminOrdersPage]
})
export class AdminOrdersPageModule {}
