import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [TableComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[TableComponent]
})
export class TableModule { }
