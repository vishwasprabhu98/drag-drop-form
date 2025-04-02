import { FormField } from '../models/input-field';
import { INPUT_TYPES } from './input-types';

export const INPUT_OBJECTS: FormField[] = [
  {
    controlName: '',
    formControlName: '',
    type: INPUT_TYPES.INPUT,
    placeholder: 'Enter Text Input',
    label: 'Text Input',
    hint: 'Hint for text',
    showClear: false,
    checkboxValue: null,
    options: [],
    defaultValue: null,
    required: true,
    validationsAvailable: [
      { name: 'minLength', value: 3, addValidation: true, errorMessage: 'Min Length error' },
      { name: 'maxLength', value: null, addValidation: false, errorMessage: 'Max length error' },
      { name: 'pattern', value: null, addValidation: false, errorMessage: 'Pattern not matching' },
      { name: 'min', value: null, addValidation: false, errorMessage: 'Min number' },
      { name: 'max', value: null, addValidation: false, errorMessage: 'Max number' },
    ],
  },
  {
    controlName: '',
    formControlName: '',
    type: INPUT_TYPES.DROPDOWN,
    placeholder: 'Select Dropdown Item',
    label: 'Choose here',
    hint: '',
    showClear: false,
    checkboxValue: null,
    options: [
      { label: 'Label 1', value: 1 },
      { label: 'Label 2', value: 2 },
    ],
    required: true,
    defaultValue: null,
    validationsAvailable: [],
  },
  {
    controlName: '',
    formControlName: '',
    type: 'radio',
    placeholder: 'Select Radio item',
    label: 'Select Item from radio',
    hint: 'radio selection',
    showClear: false,
    checkboxValue: null,
    options: [
      { label: 'Label 1', value: 1 },
      { label: 'Label 2', value: 2 },
    ],
    required: true,
    defaultValue: null,
    validationsAvailable: [],
  },
  {
    controlName: '',
    formControlName: '',
    type: 'checkbox',
    placeholder: 'Checkbox Selection',
    label: 'Label',
    hint: '',
    showClear: false,
    checkboxValue: null,
    options: [],
    required: true,
    defaultValue: true,
    validationsAvailable: [],
  },
  {
    controlName: '',
    formControlName: '',
    type: 'datepicker',
    placeholder: 'Choose Valid Date',
    label: 'Select Date',
    hint: 'MM/DD/YYYY',
    showClear: false,
    options: [],
    checkboxValue: null,
    validationsAvailable: [],
    required: true,
    defaultValue: new Date(),
  },
];
