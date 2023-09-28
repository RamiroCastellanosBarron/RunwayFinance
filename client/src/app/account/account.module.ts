import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { NavComponent } from './nav/nav.component';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { ProfilePictureComponent } from './profile-picture/profile-picture.component';
import { PasswordUpdateComponent } from './password-update/password-update.component';


@NgModule({
  declarations: [

    AccountComponent,
       NavComponent,
       ProfilePictureComponent,
       PasswordUpdateComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    CoreModule,
    SharedModule
  ]
})
export class AccountModule { }
