import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasswordUpdateComponent } from './password-update/password-update.component';
import { ProfilePictureComponent } from './profile-picture/profile-picture.component';

const routes: Routes = [
  {
    path: 'password-update',
    component: PasswordUpdateComponent
  },
  {
    path: 'profile-picture',
    component: ProfilePictureComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
