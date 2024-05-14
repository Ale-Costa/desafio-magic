import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'cards',
    loadComponent: () =>
      import('./cards/cards.component').then((c) => c.CardsComponent),
  },
];
