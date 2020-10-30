import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { _focus } from 'src/app/_data/_focus';
import { _organization } from 'src/app/_data/_organizations';
import { TrainerDTO } from 'src/app/_model/_Dto/BaseUserDTO';
import { FilterParams } from 'src/app/_model/_Dto/FilterParamsDTO';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-alltrainers',
  templateUrl: './alltrainers.component.html',
  styleUrls: ['./alltrainers.component.css'],
})
export class AlltrainersComponent {
  trainers: TrainerDTO[] = [];
  isSearched: boolean = false;
  isSinglePage: boolean = false;
  /////////////////////
  filterParams: FilterParams = new FilterParams();
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.formInit();
    this.getAllTrainer();
  }
  private getAllTrainer() {
    this.spinner.show();
    this.userService
      .getAll(this.filterParams)
      .stateChanges()
      .subscribe(
        (res) => {
          this.trainers = res.map((data: any, index: number) => {
            const doc = data.payload.doc;
            const trainerData: TrainerDTO = doc.data();
            //First & End
            if (index === res.length - 1) {
              this.filterParams.LastItem = doc;
            }

            trainerData.uid = doc.id;
            return trainerData;
          });
          if (this.isSinglePage) {
            this.isSinglePage =
              this.trainers.length < this.filterParams.PageSize ? true : false;
          }
          this.spinner.hide();
        },
        (err) => {
          console.log('err', err);
          this.toastr.error(
            'Sorry! We are unable to fetch the data at this time, please come back later!'
          );
        }
      );
  }
  getNext() {
    this.filterParams.FirstItem.push(this.filterParams.LastItem);
    this.getAllTrainer();
  }
  getPrevious() {
    this.filterParams.LastItem = null;
    this.getAllTrainer();
    this.filterParams.FirstItem.pop();
  }
  searchForm: FormGroup;
  private formInit() {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
      gender: new FormControl(this.filterParams.Gender),
      onlineTraining: new FormControl(this.filterParams.OnlineTraining),
    });
  }
  onSearch() {
    this.onResetPaging();
    const { search, gender, onlineTraining } = this.searchForm.value;
    this.filterParams.Search = search;
    this.filterParams.Gender = gender;
    this.filterParams.OnlineTraining = onlineTraining;
    this.isSinglePage = true;
    this.isSearched = true;
    this.getAllTrainer();
  }
  onResetPaging() {
    this.filterParams.FirstItem = [];
    this.filterParams.LastItem = null;
  }
  onResetComplete() {
    this.filterParams = new FilterParams();
    this.formInit();
    this.isSinglePage = false;
    this.isSearched = false;
    this.getAllTrainer();
  }
}
