import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

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
    MatInputModule
  ],
  templateUrl: './edit-form-data.component.html',
  styleUrl: './edit-form-data.component.scss'
})
export class EditFormDataComponent {

  data = inject(MAT_DIALOG_DATA)
  dialogRef = inject(MatDialogRef<EditFormDataComponent>)

  editFieldsData!: FormGroup

  // {
  //     controlName: '',
  //     formControlName: '',
  //     type: INPUT_TYPES.INPUT,
  //     placeholder: 'Enter Text Input',
  //     label: 'Text Input',
  //     hint: 'Hint for text',
  //     showClear: false,
  //     validation: {
  //       minLength: 'Min Length error',
  //       maxLength: 'Max length error',
  //       required: 'Required',
  //       pattern: 'Pattern not matching',
  //       min: 'Min number',
  //       max: 'Max number',
  //     },
  //     options: [],
  //     defaultValue: null,
  //     required: true,
  //     validationsAvailable: [
  //       { name: 'minLength', value: null, addValidation: false },
  //       { name: 'maxLength', value: null, addValidation: false },
  //       { name: 'required', value: null, addValidation: true },
  //       { name: 'pattern', value: null, addValidation: false },
  //       { name: 'min', value: null, addValidation: false },
  //       { name: 'max', value: null, addValidation: false },
  //     ],
  //   },

  constructor(private fb: FormBuilder) {
    
    let formObject: Record<string, FormControl|FormArray> = {}

    formObject['formControlName'] = new FormControl(this.data.item.formControlName, Validators.required)
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

    this.editFieldsData = new FormGroup(formObject)
  }

  getOptionsFormGroup(option: {label: string, value: string|number|null}) {
    return new FormGroup({
      label: new FormControl(option.label, Validators.required),
      value: new FormControl(option.value, Validators.required),
    })
  }

  close() {
    this.dialogRef.close()
  }

  get options(): FormArray {
    return this.editFieldsData.get('options') as FormArray;
  }

  save() {
    console.log(this.editFieldsData.getRawValue());
    
    this.dialogRef.close({
      ...this.data.item,
      ...this.editFieldsData.getRawValue()
    })
  }

}
