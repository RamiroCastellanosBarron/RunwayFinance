import { AbstractControl, ValidatorFn } from "@angular/forms";

export function differentFromCurrentPasswordValidator(currentPasswordControl: AbstractControl): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const newPassword = control.value;
    const currentPassword = currentPasswordControl.value;
    return newPassword === currentPassword ? { 'sameAsCurrent': {value: control.value} } : null;
  };
}

export function matchValues(matchTo: string): ValidatorFn {
  return (control: AbstractControl) => {
    return control.value === control.parent?.get(matchTo)?.value ? null : {notMatching: true}
  }
}

export function formatDate(date: Date): string {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}
