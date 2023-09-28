import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AccountService } from 'src/app/core/services/account.service';
import { Account } from 'src/app/shared/models/account';

@Component({
  selector: 'account-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  account: Account = {} as Account;

  constructor(public accountService: AccountService, private router: Router) {
    this.accountService.currentAccount$.pipe(take(1)).subscribe({
      next: account => {
        if (account) this.account = account;
      }
    })
  }

  onLogout() {
    this.accountService.logout();
    this.router.navigate(['/auth/login'], {
      queryParams: {
        email: this.account.email
      }
    })
  }

}
