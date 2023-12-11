import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserDetailsPage } from './user-details.page';
import { BasketPage } from '../basket/basket.page';
import { OrdersComponent } from 'src/app/components/orders/orders.component';

const routes: Routes = [
  {
    path: '',
    component: UserDetailsPage
  },
  {
    path: 'basket',
    component: BasketPage
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserDetailsPageRoutingModule {}
