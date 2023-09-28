import { FormGroup } from "@angular/forms";

export class PasswordUpdate {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;

  private constructor(data: Partial<PasswordUpdate>) {
    this.currentPassword = data.currentPassword ?? '';
    this.newPassword = data.newPassword ?? '';
    this.confirmNewPassword = data.confirmNewPassword ?? '';
  }

  static fromFormData(formData: FormGroup): PasswordUpdate {
    const data = formData.value;
    return new PasswordUpdate({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
      confirmNewPassword: data.confirmNewPassword,
    })
  }
}
