import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminHomePagePage } from './admin-home-page.page';

const routes: Routes = [
  {
    path: '',
    component: AdminHomePagePage
  },
  {
    path: 'content',
    loadChildren: () => import('../../components/content/content.module').then( m => m.ContentModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminHomePagePageRoutingModule {}
