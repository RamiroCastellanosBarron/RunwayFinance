import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/core/services/account.service';
import { AccountRegister } from 'src/app/shared/models/account';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({})
  complexPassword = "(?=^.{6,255}$)((?=.*\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*"
  submitAttempted = false;

  sexes = [
    {
      id: 'Masculino',
      value: 'Masculino'
    },
    {
      id: 'Femenino',
      value: 'Femenino'
    }
  ]

  constructor(private fb: FormBuilder, private accountService: AccountService,
    private toastr: ToastrService, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      sex: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30), Validators.pattern(this.complexPassword)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
      agreeTermsAndConditions: [false, Validators.requiredTrue],
      agreePrivacyPolicy: [false, Validators.requiredTrue],
    })
  }

  onSubmit(): void {
    const accountRegister: AccountRegister = {
      firstName: this.registerForm.controls['firstName'].value,
      lastName: this.registerForm.controls['lastName'].value,
      sex: this.registerForm.controls['sex'].value,
      dateOfBirth: this.formatDate(this.registerForm.controls['dateOfBirth'].value),
      email: this.registerForm.controls['email'].value,
      phoneNumber: this.registerForm.controls['phoneNumber'].value,
      password: this.registerForm.controls['password'].value,
      confirmPassword: this.registerForm.controls['confirmPassword'].value,
      agreeTermsAndConditions: this.registerForm.controls['agreeTermsAndConditions'].value,
      agreePrivacyPolicy: this.registerForm.controls['agreeTermsAndConditions'].value
    };
    this.submitAttempted = true;
    if (this.registerForm.valid) {
      this.accountService.register(accountRegister).subscribe({
        next: () => {
          this.router.navigateByUrl('/account/edit');
          this.toastr.success('Account created successfully');
        }
      })
    }
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : {notMatching: true}
    }
  }

  private formatDate(date: Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
}
