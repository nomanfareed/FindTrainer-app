import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { _focus } from 'src/app/_data/_focus';
import { TrainerDTO } from 'src/app/_model/_Dto/BaseUserDTO';
import { UpdateTrainerAccountDTO } from 'src/app/_model/_Dto/SettingDTO';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-update-trainer',
  templateUrl: './update-trainer.component.html',
  styleUrls: ['./update-trainer.component.css'],
})
export class UpdateTrainerComponent {
  @Input() fullData: TrainerDTO;
  TrainerFormAccount: FormGroup;
  dataArr = _focus;
  initData: UpdateTrainerAccountDTO = {
    focus: [],
    city: '',
    province: '',
    country: '',
    fullAddress: '',
    onlineTraining: true,
  };

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastS: ToastrService
  ) {}
  ngOnChanges(): void {
    this.dataTransferInit();
    this.initForm();
  }
  dataTransferInit() {
    if (this.fullData) {
      Object.assign(this.initData, this.fullData);
    }
  }
  initForm() {
    this.TrainerFormAccount = this.fb.group({
      city: [this.initData.city, [Validators.required]],
      country: [this.initData.country, [Validators.required]],
      province: [this.initData.province, [Validators.required]],
      fullAddress: [this.initData.fullAddress, [Validators.required]],
      onlineTraining: [this.initData.onlineTraining, [Validators.required]],
      focus: [this.initData.focus, [Validators.required]],
    });
  }
  select(item: string) {
    const { focus } = this.TrainerFormAccount.value;
    focus.push(item);
    this.TrainerFormAccount.patchValue({
      focus,
    });
  }
  deselect(item: string) {
    let { focus } = this.TrainerFormAccount.value;
    focus = focus.filter((e) => e !== item);
    this.TrainerFormAccount.patchValue({
      focus,
    });
  }
  submitFunc(): void {
    //Compare
    const updatedData = { ...this.fullData, ...this.TrainerFormAccount.value };
    const oldData = this.fullData;
    if (JSON.stringify(oldData) === JSON.stringify(updatedData)) {
      this.toastS.error('Please change the data before save, thanks!');
    } else {
      this.userService
        .EditUser(updatedData)
        .then(() => {
          this.toastS.info('Account information is saved');
        })
        .catch((error) => {
          this.toastS.error(error.message);
        });
    }
  }
}
