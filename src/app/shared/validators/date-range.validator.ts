import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export function dateRangeValidator(minControlName: string, maxControlName: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const start: Date = new Date((formGroup as FormGroup).controls[minControlName].value);
    const end: Date = new Date((formGroup as FormGroup).controls[maxControlName].value);

    if (start && end) {
      const isRangeValid = (end.getTime() - start.getTime() > 0);
      return isRangeValid ? null : { dateRange: true };
    }

    return null;
  }
}
