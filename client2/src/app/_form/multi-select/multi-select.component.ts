import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css'],
})
export class MultiSelectComponent implements OnInit {
  myForm: FormGroup;
  @Input() dataArr: string[];
  @Input() existedArr: string[];
  @Input() label: string;
  @Input() limit: number;
  @Output() selectFunction = new EventEmitter();
  @Output() deselectFunction = new EventEmitter();
  filterCtrl: FormControl=new FormControl('');
  allData: any[] = [];
  filteredData: any[] = [];
  disabled = false;
  ShowFilter = false;
  limitSelection = false;
  selectedItems: any[];
  protected _onDestroy = new Subject<void>();
  public filteredDataMulti: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;
  dropdownSettings: any = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 4,
    allowSearchFilter: true,
    limitSelection: null,
  };

  constructor(private fb: FormBuilder) { }
  ngOnInit() {
    // load the initial bank list
    this.filteredDataMulti.next(this.allData.slice());

    // listen for search field value changes
    this.filterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanksMulti();
      });
  }
  ngOnChanges(): void {
    this.allData = this.transformData(this.dataArr);
    this.dropdownSettings.limitSelection = this.limit;
    this.selectedItems = this.transformData(this.existedArr);
    this.myForm = this.fb.group({
      [this.label]: [...this.transformData(this.existedArr)],
    });
  }

  onItemSelect(items: any) {
    this.selectFunction.emit(items['item_text']);
  }
  onItemDeSelect(items: any) {
    this.deselectFunction.emit(items['item_text']);
  }
  transformData(arr: string[]) {
    return arr.map((e, i) => {
      return {
        item_id: i,
        item_text: e,
      };
    });
  }
  ngAfterViewInit() {
    this.setInitialValue();
  }

  protected setInitialValue() {
    this.filteredDataMulti
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.multiSelect.compareWith = (a: any, b: any) => a && b && a.item_id === b.item_id;
      });
  }
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  protected filterBanksMulti() {
    if (!this.allData) {
      return;
    }
    // get the search keyword
    let search = this.filterCtrl.value;
    if (!search) {
      this.filteredDataMulti.next(this.allData.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredDataMulti.next(
      this.allData.filter(bank => bank.item_text.toLowerCase().indexOf(search) > -1)
    );
  }
}
