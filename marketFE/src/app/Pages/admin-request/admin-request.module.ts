import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminRequestPageRoutingModule } from './admin-request-routing.module';

import { AdminRequestPage } from './admin-request.page';
import { TableModule } from 'src/app/components/table/table.module';
import { PaginatorModule } from 'src/app/components/paginator/paginator.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminRequestPageRoutingModule,
    TableModule,
    PaginatorModule
  ],
  declarations: [AdminRequestPage]
})
export class AdminRequestPageModule {}
