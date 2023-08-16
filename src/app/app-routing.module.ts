import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'users',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/users/list/list.module').then(
            (m) => m.ListPageModule
          ),
      },
      {
        path: 'create',
        loadChildren: () =>
          import('./pages/users/create/create.module').then(
            (m) => m.CreatePageModule
          ),
      },
      {
        path: ':id/edit',
        loadChildren: () =>
          import('./pages/users/edit/edit.module').then(
            (m) => m.EditPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
