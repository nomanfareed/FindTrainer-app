import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr/toastr/toastr.service';
import { Observable } from 'rxjs';
import { _login_route } from '../_data/_route';
import { AuthService } from '../_services/_authS/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
                        Observable<boolean> | Promise<boolean> | boolean {
        if (this.authService.isAuthenticated()) {
            return true;
        }

        this.router.navigate([_login_route], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
