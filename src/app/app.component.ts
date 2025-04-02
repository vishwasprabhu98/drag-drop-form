import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateFormComponent } from "./pages/create-form/create-form.component";

@Component({
  selector: 'app-root',
  imports: [CreateFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'drag-drop-form';
}
