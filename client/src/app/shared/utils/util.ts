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
