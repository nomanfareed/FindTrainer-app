import { Component, OnInit } from '@angular/core';
import {
  BaseUserUpdateForReturn,
  TrainerUpdateForReturn,
} from 'src/app/_model/_DTOs/IUserUpdate';

@Component({
  selector: 'app-dashboard-trainer-account',
  templateUrl: './dashboard-trainer-account.component.html',
  styleUrls: ['./dashboard-trainer-account.component.css'],
})
export class DashboardTrainerAccountComponent implements OnInit {
  BaseUserAccountData: BaseUserUpdateForReturn = new BaseUserUpdateForReturn();
  TrainerAccountData: TrainerUpdateForReturn = new TrainerUpdateForReturn();
  constructor() {}

  ngOnInit(): void {}
  ChangeProfileImage($event): void {
    const finalData = $event; //This is the file for the photo;
  }
  ChangeAccountSetting($event): void {
    const finalData = $event as BaseUserUpdateForReturn; // change user account data
  }
  ChangeTrainerAccount($event): void {
    const finalData = $event as TrainerUpdateForReturn; // change user account data
  }
}
