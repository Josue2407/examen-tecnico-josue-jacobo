import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('@components/home/home.component').then((m) => m.HomeComponent)
    },
    {
        path: 'empresa',
        loadComponent: () => import('@components/crud-empresa/crud-empresa.component').then((m) => m.CrudEmpresaComponent)
    },
    {
        path: 'rickandmorty',
        loadComponent: () => import('@components/rick-and-morty/rick-and-morty.component').then((m) => m.RickAndMortyComponent)
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    }

];
