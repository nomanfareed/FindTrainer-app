import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/_authS/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TrainerGuard implements CanActivate {
  constructor(private authService: AuthService,
              private toastr: ToastrService,
              private router: Router) {}

canActivate(next: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
const userRole = this.authService.getRole();

if (next.data.role.includes(userRole)) {
        return true;
    }

this.toastr.error('Access denied');
this.router.navigate(['/']);
return false;
  }

}
