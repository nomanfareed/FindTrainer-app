import {
  _AdminSideBoard,
  _TrainerSideBoard,
  _UserSideboard,
} from './../../../_data/_sideBarContent';
import { Component, Input, OnInit } from '@angular/core';
import { Role } from 'src/app/_model/_Enum/Role';
interface ISideBarContent {
  name: string;
  icon: string;
  route: string;
}
@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.css'],
})
export class DashboardSidebarComponent implements OnInit {
  @Input() role: Role = Role.user;
  data: ISideBarContent[];
  ngOnInit(): void {
    if (Role.admin === this.role) {
      this.data = _AdminSideBoard;
    }
    if (Role.trainer === this.role) {
      this.data = _TrainerSideBoard;
    }
    if (this.role === Role.user) {
      this.data = _UserSideboard;
    }
  }
}
