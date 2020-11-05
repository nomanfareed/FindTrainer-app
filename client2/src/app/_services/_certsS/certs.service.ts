import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { _api_addCert, _api_certList, _api_deleteCert } from 'src/app/_data/_apiRoute';
import { ICertificationForCreationDto } from 'src/app/_model/_DTOs/ICertificationForCreationDto';
import { environment } from 'src/environments/environment';
import { AuthService } from '../_authS/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CertsService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

 // headerObject = new HttpHeaders().set('Authorization', 'Bearer' + localStorage.getItem('token'));

  addCert(model: ICertificationForCreationDto) {
    return this.http.post(this.baseUrl + _api_addCert, model);
  }

  deleteCert(certId: number) {
    return this.http.delete(this.baseUrl + _api_deleteCert + '/' + certId);
  }

  // tslint:disable-next-line: typedef
  listCert(trainerId: number, pageNumber: number) {

    const params = new HttpParams().set('trainerId', trainerId.toString()).set('pageNumber', pageNumber.toString());

    return this.http.get(this.baseUrl + _api_certList, {params});
  }

}
