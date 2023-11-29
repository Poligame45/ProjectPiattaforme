import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './paginator.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [PaginatorComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[PaginatorComponent]
})
export class PaginatorModule { }
