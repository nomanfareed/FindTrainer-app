import { Component, OnInit } from '@angular/core';
import { BaseUserUpdateForReturn } from 'src/app/_model/_DTOs/IUserUpdate';

@Component({
  selector: 'app-dashboard-user-account',
  templateUrl: './dashboard-user-account.component.html',
  styleUrls: ['./dashboard-user-account.component.css'],
})
export class DashboardUserAccountComponent implements OnInit {
  BaseUserAccountData: BaseUserUpdateForReturn = new BaseUserUpdateForReturn();
  constructor() {}

  ngOnInit(): void {}
  ChangeProfileImage($event) {
    const finalData = $event; //This is the file for the photo;
  }
  ChangeAccountSetting($event) {
    const finalData = $event as BaseUserUpdateForReturn; // change user account data
  }
}
