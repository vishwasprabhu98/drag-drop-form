import { ValidatorFn, Validators } from '@angular/forms';
import { FormField } from '../models/input-field';

export function getValidationArray(formInstance: FormField): ValidatorFn[] {
  let validators: ValidatorFn[] = [];
  if (formInstance.required) {
    validators.push(Validators.required);
  }
  formInstance.validationsAvailable.forEach((validator) => {
    if (validator.addValidation) {
      switch (validator.name) {
        case 'minLength':
          validators.push(Validators.minLength(Number(validator.value)));
          break;
        case 'maxLength':
          validators.push(Validators.maxLength(Number(validator.value)));
          break;
        case 'pattern':
          validators.push(Validators.pattern(`${validator.value}`));
          break;
        case 'min':
          validators.push(Validators.min(Number(validator.value)));
          break;
        case 'max':
          validators.push(Validators.max(Number(validator.value)));
          break;
      }
    }
  });
  return validators;
}
