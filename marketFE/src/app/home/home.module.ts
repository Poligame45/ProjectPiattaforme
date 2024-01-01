import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { PaginatorModule } from '../components/paginator/paginator.module';
import { HeaderModule } from '../components/header/header.module';
import { ContentModule } from '../components/content/content.module';
import { FooterModule } from '../components/footer/footer.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PaginatorModule,
    HeaderModule,
    ContentModule,
    HomePageRoutingModule,
    FooterModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
