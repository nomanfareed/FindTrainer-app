import { AuthService } from './../../_services/_authS/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private authService: AuthService, private fb: FormBuilder) {}
  isLoading: boolean = false;

  readonly emailOnly = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  ngOnInit() {
  this. loginForm = this.fb.group({
    email: [
      'lola@test.com',
      [Validators.pattern(this.emailOnly), Validators.required],
    ],
    password: ['P@ssw0rd', [Validators.required]],
  });
  }

  submitFunc() {
    const finalData = this.loginForm.value;

    this.authService.login(finalData).subscribe(() => {
    });
  }
}
