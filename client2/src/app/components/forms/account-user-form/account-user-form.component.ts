import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BaseUserUpdateForReturn } from 'src/app/_model/_DTOs/IUserUpdate';

@Component({
  selector: 'app-account-user-form',
  templateUrl: './account-user-form.component.html',
  styleUrls: ['./account-user-form.component.css'],
})
export class AccountUserFormComponent {
  @Input() fullData: BaseUserUpdateForReturn = new BaseUserUpdateForReturn();
  @Output() submitForm = new EventEmitter();
  AccountForm: FormGroup;

  constructor(private fb: FormBuilder, private toastr: ToastrService) {}
  ngOnChanges(): void {
    this.initForm();
  }
  initForm(): void {
    this.AccountForm = this.fb.group({
      KnownAs: [this.fullData.KnownAs, [Validators.required]],
      Gender: [this.fullData.Gender, [Validators.required]],
      Email: [this.fullData.Email, [Validators.required]],
    });
  }

  submitFunc(): void {
    //Compare
    const updatedData = { ...this.fullData, ...this.AccountForm.value };
    const oldData = this.fullData;
    if (JSON.stringify(oldData) === JSON.stringify(updatedData)) {
      this.toastr.error('Please change the data before save, thanks!');
    } else {
      this.submitForm.emit(updatedData);
    }
  }
}
