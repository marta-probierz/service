import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'item1',
    loadChildren: () => import('./item1/item1.module').then((m) => m.Item1Module),
  },
  {
    path: 'accessibility',
    loadChildren: () => import('./accessibility/accessibility.module').then((m) => m.AccessibilityModule),
  },
  {
    path: 'transactions',
    loadChildren: () => import('./transactions/transactions.module').then((m) => m.TransactionsModule),
  },
  {
    path: 'financials',
    loadChildren: () => import('./financials/financials.module').then((m) => m.FinancialsModule),
  },
  {
    path: 'item2',
    loadChildren: () => import('./item2/item2.module').then((m) => m.Item2Module),
  },
  {
    path: 'form',
    loadChildren: () => import('./form/form.module').then((m) => m.FormModule),
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
