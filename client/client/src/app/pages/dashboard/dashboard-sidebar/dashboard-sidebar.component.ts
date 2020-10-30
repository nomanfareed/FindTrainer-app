import { Component, Input } from '@angular/core';
import {
  _TrainerSideBoard,
  _UserSideboard,
} from 'src/app/_data/_sideBarContent';
@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.css'],
})
export class DashboardSidebarComponent {
  @Input() SideboardList: any[] = [];
  constructor() {
    console.log('any');
  }
}
