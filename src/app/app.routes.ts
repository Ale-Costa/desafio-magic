import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'cards/:id',
    loadComponent: () =>
      import('./cards/cards.component').then((c) => c.CardsComponent),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
