export interface Account {
  username: string
  email: string
  id: string
  token: string
  firstName: string
  lastName: string
  sex: string
  photoUrl: string
  roles: string[]
}

import { FormGroup } from "@angular/forms";

export class AccountRegister {
  firstName: string;
  lastName: string;
  sex: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  agreeTermsAndConditions: boolean;
  agreePrivacyPolicy: boolean;

  private constructor(data: Partial<AccountRegister>) {
    this.firstName = data.firstName ?? '';
    this.lastName = data.lastName ?? '';
    this.sex = data.sex ?? '';
    this.dateOfBirth = data.dateOfBirth ? AccountRegister.formatDate(data.dateOfBirth) : '';
    this.email = data.email ?? '';
    this.phoneNumber = data.phoneNumber ?? '';
    this.password = data.password ?? '';
    this.confirmPassword = data.confirmPassword ?? '';
    this.agreeTermsAndConditions = data.agreeTermsAndConditions ?? false;
    this.agreePrivacyPolicy = data.agreePrivacyPolicy ?? false;
  }

  private static formatDate(date: string): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  static fromFormData(formData: FormGroup): AccountRegister {
    const data = formData.value;
    return new AccountRegister({
      firstName: data.firstName,
      lastName: data.lastName,
      sex: data.sex,
      dateOfBirth: AccountRegister.formatDate(data.dateOfBirth),
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: data.password,
      confirmPassword: data.confirmPassword,
      agreeTermsAndConditions: data.agreeTermsAndConditions,
      agreePrivacyPolicy: data.agreePrivacyPolicy
    });
  }
}
