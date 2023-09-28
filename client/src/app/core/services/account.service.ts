import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Account } from 'src/app/shared/models/account';
import { PasswordUpdate } from 'src/app/shared/models/password-update';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentAccountSource = new BehaviorSubject<Account | null>(null);
  currentAccount$ = this.currentAccountSource.asObservable();

  constructor(private http: HttpClient) { }

  login(value: any): Observable<Account> {
    return this.http.post<Account>(`${this.baseUrl}account/login`, value).pipe(
      map(response => {
        this.setCurrentAccount(response);
        return response;
      })
    )
  }

  logout() {
    this.removeAccountFromLocalStorage();
    this.setCurrentAccountSourceToNull();
  }

  setCurrentAccount(account: Account) {
    account.roles = [];
    const roles = this.getDecodedToken(account.token).role;
    Array.isArray(roles) ? account.roles = roles : account.roles.push(roles);
    localStorage.setItem('account', JSON.stringify(account));
    this.currentAccountSource.next(account);
  }

  getDecodedToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]))
  }

  updatePassword(passwordUpdate: any): Observable<void> {
    return this.http.put<void>(this.baseUrl + 'account/password-update', passwordUpdate);
  }

  deleteProfilePicture(): Observable<Account> {
    return this.http.delete<Account>(`${this.baseUrl}account/profile-picture`);
  }

  private removeAccountFromLocalStorage(): void {
    localStorage.removeItem('account');
  }

  private setCurrentAccountSourceToNull(): void {
    this.currentAccountSource.next(null);
  }

}
