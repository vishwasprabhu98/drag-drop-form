import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { FormField } from '../../../core/models/input-field';
@Component({
  selector: 'app-dropdown',
  imports: [MatSelectModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent {
  @Input() inputData!: FormField
  @Input() control: any;
  @Input() onChangesToggle!: boolean
}
