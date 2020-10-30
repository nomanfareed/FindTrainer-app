import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthTrainerGuard implements CanActivate {
  constructor(private AuthS: AuthService) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    if (await this.AuthS.checkIfTrainer()) {
      return true;
    }
    return false;
  }
}
