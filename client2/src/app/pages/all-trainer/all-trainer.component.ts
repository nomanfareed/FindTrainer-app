import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { _focus } from 'src/app/_data/_focus';
import { filter_ProfileUrl_Method } from 'src/app/_methods/_filter_profileUrl_method';
import { IUserForListDto } from 'src/app/_model/_DTOs/IUserForListDto';
import { UserParams } from 'src/app/_model/_DTOs/UserParams';
import { Gender } from 'src/app/_model/_Enum/Gender';
import { OrderByEnum } from 'src/app/_model/_Enum/OrderByEnum';

@Component({
  selector: 'app-all-trainer',
  templateUrl: './all-trainer.component.html',
  styleUrls: ['./all-trainer.component.css'],
})
export class AllTrainerComponent implements OnInit {
  //Below is sample data
  TrainersList: IUserForListDto[] = [
    {
      Id: '1',
      Gender: Gender.male,
      KnownAs: 'Tim',
      LastActive: new Date(Date.now()),
      AvgStar: 5,
      TotalStars: 120,
      PhotoUrl: null,
      Focus: [_focus[0], _focus[1], _focus[2], _focus[3], _focus[4]], //ApplicationUserFocuses from API
      City: 'Toronto',
      Province: 'ON',
      Country: 'Canada',
    },
    {
      Id: '1',
      Gender: Gender.male,
      KnownAs: 'Tim',
      LastActive: new Date(Date.now()),
      AvgStar: 5,
      TotalStars: 120,
      PhotoUrl: null,
      Focus: [_focus[0], _focus[1], _focus[2], _focus[3], _focus[4]], //ApplicationUserFocuses from API
      City: 'Toronto',
      Province: 'ON',
      Country: 'Canada',
    },
    {
      Id: '1',
      Gender: Gender.male,
      KnownAs: 'Tim',
      LastActive: new Date(Date.now()),
      AvgStar: 5,
      TotalStars: 120,
      PhotoUrl: null,
      Focus: [_focus[0], _focus[1], _focus[2], _focus[3], _focus[4]], //ApplicationUserFocuses from API
      City: 'Toronto',
      Province: 'ON',
      Country: 'Canada',
    },
    {
      Id: '1',
      Gender: Gender.male,
      KnownAs: 'Tim',
      LastActive: new Date(Date.now()),
      AvgStar: 5,
      TotalStars: 120,
      PhotoUrl: null,
      Focus: [_focus[0], _focus[1], _focus[2], _focus[3], _focus[4]], //ApplicationUserFocuses from API
      City: 'Toronto',
      Province: 'ON',
      Country: 'Canada',
    },
    {
      Id: '1',
      Gender: Gender.male,
      KnownAs: 'Tim',
      LastActive: new Date(Date.now()),
      AvgStar: 5,
      TotalStars: 120,
      PhotoUrl: null,
      Focus: [_focus[0], _focus[1], _focus[2], _focus[3], _focus[4]], //ApplicationUserFocuses from API
      City: 'Toronto',
      Province: 'ON',
      Country: 'Canada',
    },
    {
      Id: '1',
      Gender: Gender.male,
      KnownAs: 'Tim',
      LastActive: new Date(Date.now()),
      AvgStar: 5,
      TotalStars: 120,
      PhotoUrl: null,
      Focus: [_focus[0], _focus[1], _focus[2], _focus[3], _focus[4]], //ApplicationUserFocuses from API
      City: 'Toronto',
      Province: 'ON',
      Country: 'Canada',
    },
    {
      Id: '1',
      Gender: Gender.male,
      KnownAs: 'Tim',
      LastActive: new Date(Date.now()),
      AvgStar: 5,
      TotalStars: 120,
      PhotoUrl: null,
      Focus: [_focus[0], _focus[1], _focus[2], _focus[3], _focus[4]], //ApplicationUserFocuses from API
      City: 'Toronto',
      Province: 'ON',
      Country: 'Canada',
    },
  ];
  UserParams: UserParams = new UserParams();
  @ViewChild('search') searchTerm: ElementRef;
  constructor() {
    this.ImageFilter();
  }
  ImageFilter(): void {
    this.TrainersList = this.TrainersList.map((e) => {
      e.PhotoUrl = filter_ProfileUrl_Method(e.Gender, e.PhotoUrl);
      return e;
    });
  }
  onSearch(): void {
    this.UserParams = new UserParams();
    this.UserParams.Search = this.searchTerm.nativeElement.value;
    this.UserParams.PageNumber = 1;
    this.filterAndFetchData(this.UserParams);
  }
  onSortSelected(sort: OrderByEnum): void {
    this.UserParams.OrderBy = sort;
    this.filterAndFetchData(this.UserParams);
  }
  onFilterSelected(): void {
    this.filterAndFetchData(this.UserParams);
  }
  onReset(): void {
    if (this.searchTerm) {
      this.searchTerm.nativeElement.value = '';
    }
    this.UserParams = new UserParams();
    this.filterAndFetchData(this.UserParams);
  }
  private filterAndFetchData(params: UserParams) {
    //Call the server to fetch the data using the params
  }
  ngOnInit(): void {}
}
