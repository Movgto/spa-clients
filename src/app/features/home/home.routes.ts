import { Routes } from "@angular/router";

export const HOME_ROUTES : Routes = [
    {
        path: '',
        loadComponent: () => import('./home.component').then(m => m.HomeComponent)
    },
    {
        path: 'services',
        loadComponent: () => import('./services/services.component').then(m => m.ServicesComponent)
    }
]