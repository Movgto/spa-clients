import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./layouts/home-layout/home.layout').then(m => m.HomeLayout),
        loadChildren: () => import('./features/home/home.routes').then(m => m.HOME_ROUTES)
    },
    {
        path: '**',
        loadComponent: () => import('./features/not-found/not-found.component').then(m => m.NotFoundComponent)
    }
];
