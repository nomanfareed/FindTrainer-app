import {
  IUserForRegisterDto,
  UserForRegisterDto,
} from './../../_model/_DTOs/IUserForRegisterDto';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Role } from 'src/app/_model/_Enum/Role';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signUpForm: FormGroup;
  initData: IUserForRegisterDto = new UserForRegisterDto();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}
  readonly emailOnly = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  initForm() {
    this.signUpForm = this.fb.group({
      Email: [
        this.initData.Email,
        [Validators.pattern(this.emailOnly), Validators.required],
      ],
      Password: [
        this.initData.Password,
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.minLength(8),
        ],
      ],
      Gender: [this.initData.Gender, [Validators.required]],
      IsTrainer: [false, [Validators.required]],
      KnownAs: [this.initData.KnownAs, [Validators.required]],
    });
  }

  submitFunc(): void {
    const finalData: UserForRegisterDto = {
      ...this.initData,
      ...this.signUpForm.value,
    };
  }
}
