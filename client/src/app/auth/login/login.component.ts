import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/core/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({})
  submitAttempted: boolean = false;
  emailFromQuery: string = '';
  returnUrl?: string;
  focusOnEmail: boolean = false;
  focusOnPassword: boolean = false;

  constructor(private fb: FormBuilder, private accountService: AccountService,
    private toastr: ToastrService, private router: Router, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getQueryParams();
    this.initForm();
  }

  onSubmit() {
    this.submitAttempted = true;
    if (this.loginForm.valid) {
      this.accountService.login(this.loginForm.value).subscribe({
        next: account => {
          this.submitAttempted = false;
          this.router.navigate(['/account']);
        }
      })
    }
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: [this.emailFromQuery, [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  getQueryParams() {
    this.route.queryParams.subscribe({
      next: params => {
        if (params['email']) {
          this.emailFromQuery = params['email'];
          this.focusOnPassword = true;
          this.focusOnEmail = false;
        } else {
          this.focusOnEmail = true;
          this.focusOnPassword = false;
        }
        if (params['returnUrl']) this.returnUrl = params['returnUrl'];
      }
    });
  }

}
