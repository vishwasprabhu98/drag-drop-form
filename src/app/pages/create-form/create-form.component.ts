import { Component, inject } from '@angular/core';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { InputComponent } from '../form-items/input/input.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { DropdownComponent } from '../form-items/dropdown/dropdown.component';
import { RadioComponent } from '../form-items/radio/radio.component';
import { CheckboxComponent } from '../form-items/checkbox/checkbox.component';
import { DatepickerComponent } from '../form-items/datepicker/datepicker.component';
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
  dialog = inject(MatDialog)

  basket: FormField[] = [];
  basketForm = new FormGroup({});
  formName = ''
  onChangesToggle = false

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
        new FormControl(formInstance.defaultValue, [...this.getValidationArray(formInstance)])
      );

      if (
        event.currentIndex >= 0 &&
        event.currentIndex <= event.container.data.length
      ) {
        event.container.data.splice(event.currentIndex, 0, formInstance); // Insert item at specific position
      }
    }
  }

  getValidationArray(formInstance: FormField): ValidatorFn[] {
    let validators: ValidatorFn[] = []
    if (formInstance.required) {
      validators.push(Validators.required)
    }
    formInstance.validationsAvailable.forEach(validator => {
      if (validator.addValidation) {
        switch(validator.name) {
          case 'minLength': validators.push(Validators.minLength(validator.value)); break;
          case 'maxLength': validators.push(Validators.maxLength(validator.value)); break;
          case 'pattern': validators.push(Validators.pattern(`${validator.value}`)); break;
          case 'min': validators.push(Validators.min(validator.value)); break;
          case 'max': validators.push(Validators.max(validator.value)); break;
        }
      }
    })
    return validators
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
          this.basketForm.get(item.controlName)?.addValidators([...this.getValidationArray(item)])
          this.basketForm.get(item.controlName)?.updateValueAndValidity();
          this.onChangesToggle = !this.onChangesToggle
        }
      }
    )
  }

  submit() {
    console.log(this.basketForm.value);
  }
}
