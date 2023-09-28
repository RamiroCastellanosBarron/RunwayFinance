import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    loadChildren: () => import('./home/home.module')
      .then(x => x.HomeModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module')
      .then(x => x.AuthModule)
  },
  {
    path: 'account',
    component: AccountComponent,
    loadChildren: () => import('./account/account.module')
      .then(x => x.AccountModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
