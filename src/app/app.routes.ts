import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
      path: 'home',
      loadComponent: () =>
        import('@/pages/home/home.component'),title:'Home'
    },
    {
      path: 'cart',
      loadComponent: () =>
        import('@/components/cart/cart.component'),title:'Cart'
    },
    {
      path: '**',
      loadComponent: () => import('@/core/not-found/not-found.component'),
      title: 'Not Found',
    },
  ];