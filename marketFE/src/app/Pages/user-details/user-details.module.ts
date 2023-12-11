import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserDetailsPageRoutingModule } from './user-details-routing.module';

import { UserDetailsPage } from './user-details.page';
import { TableModule } from 'src/app/components/table/table.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserDetailsPageRoutingModule,
    TableModule
  ],
  declarations: [UserDetailsPage]
})
export class UserDetailsPageModule {}
