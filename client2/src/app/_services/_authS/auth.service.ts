import { IUserForDetailedDto } from './../../_model/_DTOs/IUserForDetailedDto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { IUserForLoginDto } from 'src/app/_model/_DTOs/IUserForLoginDto';
import { environment } from 'src/environments/environment';
import { _api_login, _api_register } from 'src/app/_data/_apiRoute';
import { map } from 'rxjs/operators';
import { IUserForRegisterDto } from 'src/app/_model/_DTOs/IUserForRegisterDto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<IUserForDetailedDto>(null);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private http: HttpClient) {}

  login(model: IUserForLoginDto) {
    return this.http.post(this.baseUrl + _api_login, model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }
  register(model: IUserForRegisterDto) {
    return this.http.post(this.baseUrl + _api_register, model).pipe(
      map((response: any) => {
        if (response) {
          this.setCurrentUser(response);
        }
      })
    );
  }
  setCurrentUser(user: any) {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? (user.roles = roles) : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('userRole', JSON.stringify(user.roles));
    this.currentUserSource.next(user);
  }
  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
  getDecodedToken(token) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  getRole() {
    return localStorage.getItem('userRole');
  }
  
  isAuthenticated() {
    return localStorage.getItem('user') !== null;
  }
}
