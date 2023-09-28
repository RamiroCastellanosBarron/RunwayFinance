import { Component, OnInit } from '@angular/core';
import { AccountService } from './core/services/account.service';
import { Account } from './shared/models/account';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.setCurrentAccount();
  }

  setCurrentAccount() {
    const accountString = localStorage.getItem('account');
    if (!accountString) return;
    const account: Account = JSON.parse(accountString);
    this.accountService.setCurrentAccount(account);
  }
}
