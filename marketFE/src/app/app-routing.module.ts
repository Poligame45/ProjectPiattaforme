import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './Services/guards.service';

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
  },
  {
    path: 'basket',
    canActivate: [authGuard],
    data: { authorities: 'CUSTOMER' },
    loadChildren: () => import('./Pages/basket/basket.module').then( m => m.BasketPageModule)
  },
  {
    path: 'product-details',
    loadChildren: () => import('./Pages/product-details/product-details.module').then( m => m.ProductDetailsPageModule)
  },
  {
    path: 'admin-home-page',
    canActivate: [authGuard],
    data: { authorities: 'ADMIN' },
    loadChildren: () => import('./Pages/admin-home-page/admin-home-page.module').then( m => m.AdminHomePagePageModule)
  },
  {
    path: 'customer-orders',
    loadChildren: () => import('./Pages/customer-orders/customer-orders.module').then( m => m.CustomerOrdersPageModule)
  },
  {
    path: 'admin-orders',
    canActivate: [authGuard],
    data: { authorities: 'ADMIN' },
    loadChildren: () => import('./Pages/admin-orders/admin-orders.module').then( m => m.AdminOrdersPageModule)
  },
  {
    path: 'admin-products',
    canActivate: [authGuard],
    data: { authorities: 'ADMIN' },
    loadChildren: () => import('./Pages/admin-products/admin-products.module').then( m => m.AdminProductsPageModule)
  },
  {
    path: 'add-update-stored-product',
    canActivate: [authGuard],
    data: { authorities: 'ADMIN' },
    loadChildren: () => import('./Pages/add-update-stored-product/add-update-stored-product.module').then( m => m.AddUpdateStoredProductPageModule)
  },
  {
    path: 'order-details',
    loadChildren: () => import('./Pages/order-detail/order-detail.module').then( m => m.OrderDetailPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }