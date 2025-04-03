import { Component, Input, input, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { FormField } from '../../../core/models/input-field';
import { getErrorMessage } from '../../../core/utils/error-message';

@Component({
  selector: 'app-input',
  imports: [MatInputModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  @Input() inputData!: FormField
  @Input() control: any;
  @Input() onChangesToggle!: boolean

  errorMessageObject: Record<string, string> = {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['onChangesToggle']) {
      this.inputData.validationsAvailable.forEach(
        validation => {
          this.errorMessageObject[validation.name] = validation.errorMessage ?? ''
        }
      )
    }
  }
  
  getErrors() {
    return getErrorMessage(this.control.errors, this.errorMessageObject);
  }
}
