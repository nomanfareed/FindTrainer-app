import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { _api_deleteUser, _api_getFilteredUsers, _api_getUser, _api_updateUser } from 'src/app/_data/_apiRoute';
import { IUserForDetailedDto } from 'src/app/_model/_DTOs/IUserForDetailedDto';
import { IUserParams } from 'src/app/_model/_DTOs/IUserParams';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUser(id: number) {
    return this.http.get(this.baseUrl + _api_getUser + '/' + id);
  }

  getFilteredUsers(model: IUserParams) {

  console.log(model);

  const userParams = new HttpParams();
  // userParams.append(model.City, model.City);
  // userParams.append(model.Country, model.Country);
  // userParams.append(model.Focus, model.Focus);
  // userParams.append(model.Gender.toString(), model.Gender.toString());
  // userParams.append(model.KnownAs, model.KnownAs);
  // userParams.append(model.OrderBy, model.OrderBy);
  // userParams.append(model.PageNumber.toString(), model.PageNumber.toString());
  // userParams.append(model.PageSize.toString(), model.PageSize.toString());
  // userParams.append(model.Province, model.Province);

 // return this.http.get(this.baseUrl + _api_getFilteredUsers, {params: userParams});
  }

  updateUser(model: IUserForDetailedDto) {
    return this.http.put(this.baseUrl + _api_updateUser, model);
  }

  deleteCurrentUser() {
    return this.http.delete(this.baseUrl + _api_deleteUser);
  }

  deleteUserById(id: number) {
    return this.http.delete(this.baseUrl + _api_deleteUser + '/' + id);
  }
}
