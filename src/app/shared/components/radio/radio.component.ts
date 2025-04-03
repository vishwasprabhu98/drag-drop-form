import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import { FormField } from '../../../core/models/input-field';
@Component({
  selector: 'app-radio',
  imports: [MatRadioModule, ReactiveFormsModule],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss'
})
export class RadioComponent {
  @Input() inputData!: FormField
  @Input() control: any;
}
