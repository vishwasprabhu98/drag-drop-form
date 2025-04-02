export interface ValidationOption {
  name: string;
  value: any;
  addValidation: boolean;
  errorMessage: string;
}

export interface Option {
  label: string;
  value: any;
}

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
  defaultValue: any;
  validationsAvailable: ValidationOption[];
  checkboxValue: any; // Optional field for checkboxes
}