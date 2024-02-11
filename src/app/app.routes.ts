import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'album/:$albumId',
    loadComponent: () =>
      import('./album/album.component').then((m) => m.AlbumComponent),
  },
  {
    path: 'posts',
    loadChildren: () => import('./posts/posts.routes'),
  },
  {
    path: 'users',
    loadComponent: () => import('./users/users.component').then((m) => m.UsersComponent),
  },

  { path: '**', redirectTo: 'home' },
];
