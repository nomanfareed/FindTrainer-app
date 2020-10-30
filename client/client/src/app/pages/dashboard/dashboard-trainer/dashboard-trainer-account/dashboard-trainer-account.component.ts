import { Component } from '@angular/core';
import { TrainerDTO } from 'src/app/_model/_Dto/BaseUserDTO';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-dashboard-trainer-account',
  templateUrl: './dashboard-trainer-account.component.html',
  styleUrls: ['./dashboard-trainer-account.component.css'],
})
export class DashboardTrainerAccountComponent {
  userData: TrainerDTO;
  constructor(private US: UserService, private AS: AuthService) {
    this.getCurrentTrainerData();
  }
  getCurrentTrainerData() {
    this.US.getCurrentTrainerFull().subscribe((e: TrainerDTO) => {
      this.userData = e;
    });
  }
}
