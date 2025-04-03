import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { INPUT_TYPES } from '../../../../core/constants/input-types';
import { ValidationOption } from '../../../../core/models/input-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-form-data',
  imports: [
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    CommonModule
  ],
  templateUrl: './edit-form-data.component.html',
  styleUrl: './edit-form-data.component.scss'
})
export class EditFormDataComponent {

  data = inject(MAT_DIALOG_DATA)
  dialogRef = inject(MatDialogRef<EditFormDataComponent>)
  inputTypes = INPUT_TYPES

  editFieldsData!: FormGroup

  constructor(private fb: FormBuilder) {
    
    let formObject: Record<string, FormControl|FormArray> = {}

    formObject['formControlName'] = new FormControl(this.data.item.formControlName,[Validators.required, Validators.pattern(/^[a-zA-Z]*$/)])
    formObject['placeholder'] = new FormControl(this.data.item.placeholder)
    formObject['label'] = new FormControl(this.data.item.label, Validators.required)
    formObject['hint'] = new FormControl(this.data.item.hint)
    formObject['showClear'] = new FormControl(this.data.item.showClear),
    formObject['required'] = new FormControl(this.data.item.required),
    formObject['defaultValue'] = new FormControl(this.data.item.defaultValue)
    formObject['options'] = new FormArray<FormControl>([
      ...this.data.item.options.map(
        (option: {label: string, value: string|number|null}) => this.getOptionsFormGroup(option)
      )
    ])
    formObject['validationsAvailable'] = new FormArray<FormControl>([
      ...this.data.item.validationsAvailable.map(
        (validation: ValidationOption) => this.getValidationFormGroup(validation)
      )
    ])

    this.editFieldsData = new FormGroup(formObject)
  }

  getOptionsFormGroup(option: {label: string, value: string|number|null}) {
    return new FormGroup({
      label: new FormControl(option.label, Validators.required),
      value: new FormControl(option.value, Validators.required),
    })
  }

  getValidationFormGroup(validation: ValidationOption) {
    return new FormGroup({
      name: new FormControl(validation.name),
      value: new FormControl(validation.value), 
      addValidation: new FormControl(validation.addValidation),
      errorMessage: new FormControl(validation.errorMessage), 
    })
  }

  close() {
    this.dialogRef.close()
  }

  get options(): FormArray {
    return this.editFieldsData.get('options') as FormArray;
  }

  get validations(): FormArray {
    return this.editFieldsData.get('validationsAvailable') as FormArray;
  }

  addOption() {
    this.options.push(this.getOptionsFormGroup({label: '', value: ''}));
  }

  removeOption(index: number) {
    this.options.removeAt(index);
  }

  save() {
    console.log(this.editFieldsData.getRawValue());
    
    this.dialogRef.close({
      ...this.data.item,
      ...this.editFieldsData.getRawValue()
    })
  }

}
