import { Component, inject } from '@angular/core';
import { CommonService } from '../../core/services/common-service/common.service';
import { SaveFormService } from '../../core/services/save-form/save-form.service';
import { Router } from '@angular/router';
import { FormField } from '../../core/models/input-field';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { getValidationArray } from '../../core/utils/validator-array';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CheckboxComponent } from '../../shared/components/checkbox/checkbox.component';
import { DatepickerComponent } from '../../shared/components/datepicker/datepicker.component';
import { DropdownComponent } from '../../shared/components/dropdown/dropdown.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { RadioComponent } from '../../shared/components/radio/radio.component';
import { INPUT_TYPES } from '../../core/constants/input-types';

@Component({
  selector: 'app-fill-form',
  imports: [
    InputComponent,
    ReactiveFormsModule,
    DropdownComponent,
    RadioComponent,
    CheckboxComponent,
    DatepickerComponent,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './fill-form.component.html',
  styleUrl: './fill-form.component.scss'
})
export class FillFormComponent {

  commonService = inject(CommonService)
  router = inject(Router)
  formsService = inject(SaveFormService)
  inputTypes = INPUT_TYPES

  formUUID: string = ''
  formName = ''
  formFields?: FormField[]

  formGroup!: FormGroup

  constructor() {
    if (this.commonService.viewFormData()) {
      this.formUUID = this.commonService.viewFormData().uuid ?? ''
      if (this.formUUID) {
        const form = this.formsService.getFormByUUID(this.formUUID)
        if (!form || !form?.formObject) {
          this.formsService.openSnackBar('Form Not Found!')
          this.back()
        }
        this.formName = form?.formName || ''
        this.formFields = form?.formObject
        this.buildForm()
      } else {
        this.back()
      }
    }
  }

  buildForm() {
    let formObject: Record<string, FormControl|FormArray> = {}

    this.formFields?.forEach(formField => {
      formObject[formField.formControlName] = new FormControl(
        { value: formField.defaultValue, disabled: !this.commonService.viewFormData().editAccess }, 
        [...getValidationArray(formField)])
    })

    this.formGroup = new FormGroup(formObject)
  }

  submit() {
    this.formsService.submitForm({
      formName: this.formName,
      formData: this.formGroup.getRawValue()
    })
    this.formsService.openSnackBar('Form Submitted Successfully')
    this.back()
  }

  back() {
    this.router.navigateByUrl('view-forms')
  }

  ngOnDestroy() {
    this.commonService.setViewFormData({ uuid: null, editAccess: false })
  }
}
