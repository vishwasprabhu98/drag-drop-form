import { Component, effect, inject } from '@angular/core';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { InputComponent } from '../../shared/components/input/input.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { DropdownComponent } from '../../shared/components/dropdown/dropdown.component';
import { RadioComponent } from '../../shared/components/radio/radio.component';
import { CheckboxComponent } from '../../shared/components/checkbox/checkbox.component';
import { DatepickerComponent } from '../../shared/components/datepicker/datepicker.component';
import { MatDialog } from '@angular/material/dialog';
import { INPUT_TYPES } from '../../core/constants/input-types';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { generateRandomString } from '../../core/utils/random-string';
import { EditFormDataComponent } from './components/edit-form-data/edit-form-data.component';
import { INPUT_OBJECTS } from '../../core/constants/form-fields';
import { FormField } from '../../core/models/input-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SaveFormService } from '../../core/services/save-form/save-form.service';
import { getValidationArray } from '../../core/utils/validator-array';
import { Router } from '@angular/router';
import { CommonService } from '../../core/services/common-service/common.service';

@Component({
  selector: 'app-create-form',
  imports: [
    DragDropModule,
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
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.scss',
})
export class CreateFormComponent {
  items = INPUT_OBJECTS
  inputTypes = INPUT_TYPES
  icons = {
    [INPUT_TYPES.INPUT]: 'text_fields',
    [INPUT_TYPES.DROPDOWN]: 'rule',
    [INPUT_TYPES.DATE_PICKER]: 'calendar_month',
    [INPUT_TYPES.CHECKBOX]: 'check_box',
    [INPUT_TYPES.RADIO]: 'radio_button_checked',
    [INPUT_TYPES.TEXTAREA]: 'sticky_note_2'
  }
  dialog = inject(MatDialog)
  saveFormService = inject(SaveFormService)
  commonService = inject(CommonService)
  router = inject(Router)

  basket: FormField[] = [];
  basketForm = new FormGroup({});
  formName = ''
  formUUID: string|null = null
  onChangesToggle = false

  constructor() {
    if (this.commonService.editFormData()) {
      this.formUUID = this.commonService.editFormData()?.uuid
      if (this.formUUID && this.saveFormService.getFormByUUID(this.formUUID)?.formObject) {
        const form = this.saveFormService.getFormByUUID(this.formUUID)
        this.basket = form?.formObject ?? []
        this.formName = form?.formName || ''
        this.buidForm()
      }
    } else {
      this.formUUID = null
    }
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const formInstance = JSON.parse(
        JSON.stringify(event.previousContainer.data[event.previousIndex])
      );
      const randomString = generateRandomString();
      formInstance.controlName = randomString
      formInstance.formControlName = randomString
      this.basketForm.addControl(
        formInstance.controlName,
        new FormControl(formInstance.defaultValue, [...getValidationArray(formInstance)])
      );

      if (
        event.currentIndex >= 0 &&
        event.currentIndex <= event.container.data.length
      ) {
        event.container.data.splice(event.currentIndex, 0, formInstance); // Insert item at specific position
      }
    }
  }

  buidForm() {
    let formObject: Record<string, FormControl> = {}

    this.basket?.forEach(formField => {
      formObject[formField.controlName] = new FormControl(
        formField.defaultValue, 
        [...getValidationArray(formField)])
    })

    this.basketForm = new FormGroup(formObject)
  }

  noReturnPredicate() {
    return false;
  }

  edit(item: FormField) {
    const dialog = this.dialog.open(
      EditFormDataComponent,
      {
        data: {
          item
        }
      }
    )
    dialog.afterClosed().subscribe(
      (data?: FormField) => {
        if (data) {
          Object.assign(item, data)
          this.basketForm.get(item.controlName)?.clearValidators()
          this.basketForm.get(item.controlName)?.addValidators([...getValidationArray(item)])
          this.basketForm.get(item.controlName)?.updateValueAndValidity();
          this.onChangesToggle = !this.onChangesToggle
        }
      }
    )
  }

  removeControl(index: number) {
    this.basketForm.removeControl(this.basket[index].controlName)
    this.basketForm.updateValueAndValidity();
    this.basket.splice(index, 1)
  }

  submit() {
    if (!this.formName) {
      this.saveFormService.openSnackBar('Please enter Name of the Form!')
      return
    }
    if (!this.basket?.length) {
      this.saveFormService.openSnackBar('Add atleast One field to the Form')
      return
    }

    if (this.formUUID) {
      this.saveFormService.updateForm({ uuid: this.formUUID, formName: this.formName, formObject: this.basket})
    } else {
      this.saveFormService.saveForm({ formName: this.formName, formObject: this.basket})
    }
    this.viewAllForms()
  }

  viewAllForms() {
    this.router.navigateByUrl('view-forms')
  }

  ngOnDestroy() {
    this.commonService.setEditingFormData({ uuid: null })
  }
}
