import { Component, Input, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { FormField } from '../../../core/models/input-field';

@Component({
  selector: 'app-input',
  imports: [MatInputModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  @Input() inputData!: FormField
  @Input() control: any;
  
  getErrors() {
    console.log('%csrc/app/pages/form-items/input/input.component.ts:19 control.errors', 'color: #007acc;', this.control.errors);
  }
}
