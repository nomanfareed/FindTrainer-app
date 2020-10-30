import {
  _signup_route,
  _landing_route,
  _login_route,
  _trainers_route,
} from './../../_data/_route';
import { Component } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  _landing_route = _landing_route;
  _trainers_route = _trainers_route;
  _signup_route = _signup_route;
  _login_route = _login_route;
  isLoggined: boolean = false;
  constructor(private authService: AuthService) {
    this.isAuthenticated();
  }

  isAuthenticated() {
    this.authService.checkIfLogin().subscribe((res) => {
      if (res) {
        this.isLoggined = true;
      } else {
        this.isLoggined = false;
      }
    });
  }

  async logout(): Promise<void> {
    await this.authService.signOut();
    this.isLoggined = false;
  }
}
