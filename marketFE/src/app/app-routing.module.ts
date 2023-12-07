import { NgModule, inject } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './Services/guards.service';
import { LoginService } from './Services/login.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./Pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./Pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'user-details',
    canActivate: [authGuard],
    data: { authorities: 'CUSTOMER' },
    loadChildren: () => import('./Pages/user-details/user-details.module').then(m => m.UserDetailsPageModule)
  },  {
    path: 'basket',
    loadChildren: () => import('./Pages/basket/basket.module').then( m => m.BasketPageModule)
  },
  {
    path: 'product-details',
    loadChildren: () => import('./Pages/product-details/product-details.module').then( m => m.ProductDetailsPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
