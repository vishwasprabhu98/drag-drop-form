export interface ValidationOption {
  name: string;
  value: string|number|null;
  addValidation: boolean;
  errorMessage: string;
}

export interface Option {
  label: string;
  value: string|number;
}

type stringNumberBooleanNull = string|number|null|boolean|Date

export interface FormField {
  controlName: string;
  formControlName: string;
  type: string;
  placeholder: string;
  label: string;
  hint: string;
  showClear: boolean;
  options: Option[];
  required: boolean;
  defaultValue: stringNumberBooleanNull;
  validationsAvailable: ValidationOption[];
  checkboxValue: string|null; // Optional field for checkboxes
}