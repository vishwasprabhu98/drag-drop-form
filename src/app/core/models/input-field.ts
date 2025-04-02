export interface ValidationMessages {
  minLength?: string;
  maxLength?: string;
  required?: string;
  pattern?: string;
  min?: string;
  max?: string;
}

export interface ValidationOption {
  name: string;
  value: any;
  addValidation: boolean;
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
  validation: ValidationMessages | any[]; // Accepts object or empty array
  options: Option[];
  required: boolean;
  defaultValue: any;
  validationsAvailable: ValidationOption[];
  checkboxValue: any; // Optional field for checkboxes
}