import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminOrdersPageRoutingModule } from './admin-orders-routing.module';

import { AdminOrdersPage } from './admin-orders.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TableModule } from 'src/app/components/table/table.module';
import { PaginatorModule } from 'src/app/components/paginator/paginator.module';
import { FooterModule } from 'src/app/components/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminOrdersPageRoutingModule,
    HeaderModule,
    TableModule,
    PaginatorModule,
    ReactiveFormsModule,
    FooterModule
  ],
  declarations: [AdminOrdersPage]
})
export class AdminOrdersPageModule {}
