import { Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./posts.component').then((m) => m.PostsComponent),
    children: [
      {
        path: ':$postId',
        loadComponent: () =>
          import('./post/post.component').then((m) => m.PostComponent),
      }
    ]
  },
  { path: '**', redirectTo: ''
  }
];

export default routes;
