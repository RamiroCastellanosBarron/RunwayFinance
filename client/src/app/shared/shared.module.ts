import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BootstrapFormControlsModule } from 'bootstrap-form-controls';
import { ConfirmDialogComponent } from './components/confirm/confirm-dialog/confirm-dialog.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProfilePictureUploaderComponent } from './components/uploaders/profile-picture-uploader/profile-picture-uploader.component';
import { FileUploadModule } from 'ng2-file-upload';
import { PagerComponent } from './pager/pager.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BusinessSummaryModalComponent } from './components/modals/business-summary-modal/business-summary-modal.component';
import { ThemeSwitcherDropdownComponent } from './components/theme/theme-switcher-dropdown/theme-switcher-dropdown.component';
import { ThemeCyclerButtonComponent } from './components/theme/theme-cycler-button/theme-cycler-button.component';


@NgModule({
  declarations: [
    ConfirmDialogComponent,
    ProfilePictureUploaderComponent,
    PagerComponent,
    BusinessSummaryModalComponent,
    ThemeSwitcherDropdownComponent,
    ThemeCyclerButtonComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BootstrapFormControlsModule,
    ModalModule.forRoot(),
    FileUploadModule,
    PaginationModule.forRoot(),
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    BootstrapFormControlsModule,
    ConfirmDialogComponent,
    ModalModule,
    ProfilePictureUploaderComponent,
    FileUploadModule,
    PagerComponent,
    PaginationModule,
    BusinessSummaryModalComponent,
    ThemeSwitcherDropdownComponent,
    ThemeCyclerButtonComponent,
  ]
})
export class SharedModule { }
