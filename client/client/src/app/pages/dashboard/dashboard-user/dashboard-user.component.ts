import { CurrentUserStoreDTO } from './../../../_model/_Interface/IBaseUser';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { _login_route } from 'src/app/_data/_route';
import { _UserSideboard } from 'src/app/_data/_sideBarContent';
import { Role } from 'src/app/_model/_Enum/Role';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css'],
})
export class DashboardUserComponent {
  SideboardContent: any[] = [];

  constructor(
    private authS: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.spinner.show();
    this.authS.getCurrentUser().subscribe(
      async (res) => {
        const data: CurrentUserStoreDTO = await res;
        if (data.role === Role.user) {
          this.SideboardContent = _UserSideboard;
        } else {
          this.router.navigate([_login_route]);
        }
        this.spinner.hide();
      },
      () => {
        this.router.navigate([_login_route]);
        this.spinner.hide();
      }
    );
  }
}
