import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormField } from '../../../core/models/input-field';

@Component({
  selector: 'app-checkbox',
  imports: [MatCheckboxModule, ReactiveFormsModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent {
  @Input() inputData!: FormField
  @Input() control: any;
}
