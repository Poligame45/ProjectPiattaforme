import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddUpdateStoredProductPage } from './add-update-stored-product.page';

const routes: Routes = [
  {
    path: '',
    component: AddUpdateStoredProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddUpdateStoredProductPageRoutingModule {}
