import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { _focus } from 'src/app/_data/_focus';
import { TrainerUpdateForReturn } from 'src/app/_model/_DTOs/IUserUpdate';

@Component({
  selector: 'app-account-trainer-form',
  templateUrl: './account-trainer-form.component.html',
  styleUrls: ['./account-trainer-form.component.css'],
})
export class AccountTrainerFormComponent {
  @Input() fullData: TrainerUpdateForReturn = new TrainerUpdateForReturn();
  @Output() submitForm = new EventEmitter();
  TrainerFormAccount: FormGroup;
  dataArr = _focus;
  constructor(private fb: FormBuilder, private toastS: ToastrService) {
    this.initForm();

   }
  ngOnChanges(): void {
  }
  initForm(): void {
    this.TrainerFormAccount = this.fb.group({
      Introduction: [this.fullData.Introduction, [Validators.required]],
      Focus: [this.fullData.Focus, [Validators.required]],
      City: [this.fullData.City, [Validators.required]],
      Country: [this.fullData.Country, [Validators.required]],
      Province: [this.fullData.Province, [Validators.required]],
      FullAddress: [this.fullData.FullAddress, [Validators.required]],
      OnlineTraining: [this.fullData.OnlineTraining, [Validators.required]],
    });
  }
  select(item: string): void {
    const { Focus } = this.TrainerFormAccount.value;
    Focus.push(item);
    this.TrainerFormAccount.patchValue({
      Focus,
    });
  }
  deselect(item: string): void {
    let { Focus } = this.TrainerFormAccount.value;
    Focus = Focus.filter((e) => e !== item);
    this.TrainerFormAccount.patchValue({
      Focus,
    });
  }
  submitFunc(): void {
    //Compare
    const updatedData = { ...this.fullData, ...this.TrainerFormAccount.value };
    const oldData = this.fullData;
    if (JSON.stringify(oldData) === JSON.stringify(updatedData)) {
      this.toastS.error('Please change the data before save, thanks!');
    } else {
      this.submitForm.emit(updatedData);
    }
  }
}
