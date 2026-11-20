import { Routes } from '@angular/router';
import { featureGuard } from './features/feature-flags';

/**
 * Base route table. Pages are lazy-loaded, so a client that replaces
 * e.g. home.page.ts only changes that one chunk.
 */
export const SHOP_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage) },
  { path: 'products', loadComponent: () => import('./pages/product-list/product-list.page').then((m) => m.ProductListPage) },
  { path: 'products/:id', loadComponent: () => import('./pages/product-detail/product-detail.page').then((m) => m.ProductDetailPage) },
  {
    path: 'deals',
    canMatch: [featureGuard('deals')], // clients with deals: false never get this page
    loadComponent: () => import('./pages/deals/deals.page').then((m) => m.DealsPage),
  },
  { path: 'cart',loadComponent: () => import('./pages/cart/cart.page').then((m) => m.CartPage) },
  { path: '**', redirectTo: '' },
];
