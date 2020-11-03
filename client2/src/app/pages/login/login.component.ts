import { AuthService } from './../../_services/_authS/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private fb: FormBuilder) {}
  isLoading: boolean = false;

  readonly emailOnly = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  loginForm = this.fb.group({
    email: [
      'sdasdasdas@gmail.com',
      [Validators.pattern(this.emailOnly), Validators.required],
    ],
    password: ['Password123@', [Validators.required]],
  });

  submitFunc() {
    const finalData = this.loginForm.value;
  }
}
