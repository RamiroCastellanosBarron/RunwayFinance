import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/core/services/account.service';
import { ConfirmService } from 'src/app/core/services/confirm.service';
import { Account } from 'src/app/shared/models/account';
import { Modal } from 'src/app/shared/models/modal';
import { PasswordUpdate } from 'src/app/shared/models/password-update';
import { differentFromCurrentPasswordValidator, matchValues } from 'src/app/shared/utils/util';

@Component({
  selector: 'app-password-update',
  templateUrl: './password-update.component.html',
  styleUrls: ['./password-update.component.scss']
})
export class PasswordUpdateComponent implements OnInit {
  @HostListener('window:beforeunload', ['$event'])unloadNotification($event: any) {
    if (this.passwordForm.dirty) {
      $event.returnValue = true;
    }
  }

  passwordForm: FormGroup = new FormGroup({});
  modal: Modal = new Modal;
  account: Account = {} as Account;
  submitAttempted = false;
  complexPassword = "(?=^.{6,255}$)((?=.*\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*"

  constructor(private fb: FormBuilder, private accountService: AccountService,
    private confirmService: ConfirmService, private router: Router,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    const currentPasswordControl = this.fb.control('', [Validators.required]);
    const newPasswordControl = this.fb.control('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30),
      Validators.pattern(this.complexPassword),
      differentFromCurrentPasswordValidator(currentPasswordControl)
    ]);

    this.passwordForm = this.fb.group({
      currentPassword: currentPasswordControl,
      newPassword: newPasswordControl,
      confirmNewPassword: ['', [Validators.required, matchValues('newPassword')]],
    });

    this.passwordForm.controls['newPassword'].valueChanges.subscribe({
      next: () => this.passwordForm.controls['confirmNewPassword'].updateValueAndValidity()
    })
  }

  onSubmit(): void {
    this.submitAttempted = true;
    if (this.passwordForm.valid) {
      const passwordUpdate = this.passwordForm.value;
      console.log(passwordUpdate);
      this.confirmService.confirm(this.modal).subscribe({
        next: modal => {
          modal && this.accountService.updatePassword(passwordUpdate).subscribe({
            next: (res:any) => {
              this.passwordForm.reset();
              this.passwordForm.markAsPristine();
              console.log(res);
            },
            error: () => {
              this.toastr.error('No se pudo cambiar la contraseña')
            },
            complete: () => {
              this.submitAttempted = false;
              this.toastr.success('Contraseña reestablecida exitosamente');
            }
          })
        }
      })
    }
  }
}
