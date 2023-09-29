import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NavComponent } from './nav/nav.component';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { SearchComponent } from './search/search.component';
import { CompanyComponent } from './company/company.component';


@NgModule({
  declarations: [
    HomeComponent,
    NavComponent,
    SearchComponent,
    CompanyComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CoreModule,
    SharedModule,
  ]
})
export class HomeModule { }
