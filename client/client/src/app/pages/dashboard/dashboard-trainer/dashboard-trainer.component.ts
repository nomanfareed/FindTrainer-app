import { CurrentUserStoreDTO } from './../../../_model/_Interface/IBaseUser';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { _login_route } from 'src/app/_data/_route';
import { _TrainerSideBoard } from 'src/app/_data/_sideBarContent';
import { Role } from 'src/app/_model/_Enum/Role';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-dashboard-trainer',
  templateUrl: './dashboard-trainer.component.html',
  styleUrls: ['./dashboard-trainer.component.css'],
})
export class DashboardTrainerComponent {
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
        if (data.role === Role.trainer) {
          this.SideboardContent = _TrainerSideBoard;
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
