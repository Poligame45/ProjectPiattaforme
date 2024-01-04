import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminRequestPageRoutingModule } from './admin-request-routing.module';

import { AdminRequestPage } from './admin-request.page';
import { TableModule } from 'src/app/components/table/table.module';
import { PaginatorModule } from 'src/app/components/paginator/paginator.module';
import { FooterModule } from 'src/app/components/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminRequestPageRoutingModule,
    TableModule,
    PaginatorModule,
    FooterModule
  ],
  declarations: [AdminRequestPage]
})
export class AdminRequestPageModule {}
