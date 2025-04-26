import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Inicio - Repos Trackr',
    pathMatch: 'full',
  },
  {
    path: 'repositories/:username',
    loadComponent: () =>
      import('./pages/repositories/repositories.component').then(
        (m) => m.RepositoriesComponent
      ),
    title: 'Repositorios - Repos Trackr',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  },
];
