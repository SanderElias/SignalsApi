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
    loadComponent: () =>
      import('./users/users.component').then((m) => m.UsersComponent),
  },
  {
    path: 'formStuff',
    loadComponent: () =>
      import('./form-stuff/form-stuff.component').then(
        (m) => m.FormStuffComponent,
      ),
  },

  { path: '**', redirectTo: 'forms' },
];
