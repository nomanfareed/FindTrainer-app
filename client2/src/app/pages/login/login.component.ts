import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  IUserForLoginDto,
  UserForLoginDto,
} from 'src/app/_model/_DTOs/IUserForLoginDto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private fb: FormBuilder) {}
  isLoading: boolean = false;
  initData: IUserForLoginDto = new UserForLoginDto();

  readonly emailOnly = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  loginForm = this.fb.group({
    Email: [
      this.initData.Email,
      [Validators.pattern(this.emailOnly), Validators.required],
    ],
    Password: [this.initData.Password, [Validators.required]],
  });

  submitFunc() {
    const finalData: IUserForLoginDto = this.loginForm.value;
  }
}
