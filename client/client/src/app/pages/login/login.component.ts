import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { _landing_route } from 'src/app/_data/_route';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}
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
    const { email, password } = this.loginForm.value;
    this.authService.signin(email, password);
  }
}
