import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { SaveFormService } from '../../core/services/save-form/save-form.service';
import { USER_TYPE } from '../../core/enums/user-type';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  router = inject(Router)
  snackbar = inject(SaveFormService)

  formGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  ngOnInit() {
    if (localStorage.getItem('loginType')) {
      localStorage.removeItem('loginType')
      this.snackbar.openSnackBar('Logged out successfully')
    }
  }

  onLogin(e: Event) {
    e.preventDefault()
    const { username, password } = this.formGroup.value

    if (username === 'admin' && password === 'admin') {
      // Admin login
      localStorage.setItem('loginType', USER_TYPE.ADMIN)
    } else if (username === 'user' && password === 'user') {
      // User login
      localStorage.setItem('loginType', USER_TYPE.USER)
    } else {
      this.snackbar.openSnackBar('Invalid username or password')
      return
    }

    this.router.navigateByUrl('/view-forms')
  }

}
