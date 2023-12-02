import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ContentComponent } from './content.component';



@NgModule({
  declarations: [ContentComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[ContentComponent]
})
export class ContentModule { }
