import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Gender } from 'src/app/_model/_Enum/Gender';

@Component({
  selector: 'app-account-user-form',
  templateUrl: './account-user-form.component.html',
  styleUrls: ['./account-user-form.component.css']
})
export class AccountUserFormComponent implements OnInit {
  @Input() fullData: TrainerDTO | BaseUserDTO;
  AccountForm: FormGroup;
  initData: UpdateAccountDTO = {
    name: '',
    gender: Gender.male,
  };

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}
  ngOnChanges() {
    this.initForm();
  }
  initForm() {
    if (this.fullData) {
      Object.assign(this.initData, this.fullData);
    }
    this.AccountForm = this.fb.group({
      name: [this.initData.name, [Validators.required]],
      gender: [this.initData.gender, [Validators.required]],
    });
  }

  submitFunc(): void {
    //Compare
    const updatedData = { ...this.fullData, ...this.AccountForm.value };
    const oldData = this.fullData;
    if (JSON.stringify(oldData) === JSON.stringify(updatedData)) {
      this.toastr.error('Please change the data before save, thanks!');
    } else {
      this.userService
        .EditUser(updatedData)
        .then(() => {
          this.toastr.info('Account information is saved');
        })
        .catch((error) => {
          this.toastr.error(error.message);
        });
    }
  }

}
