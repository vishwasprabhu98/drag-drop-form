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
  ReactiveFormsModule,
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
    MatIconModule
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
        new FormControl(formInstance.defaultValue, [Validators.required])
      );

      if (
        event.currentIndex >= 0 &&
        event.currentIndex <= event.container.data.length
      ) {
        event.container.data.splice(event.currentIndex, 0, formInstance); // Insert item at specific position
      }
    }
  }

  noReturnPredicate() {
    return false;
  }

  edit(item: any) {
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
        }
      }
    )
  }

  submit() {
    console.log(this.basketForm.value);
  }
}
