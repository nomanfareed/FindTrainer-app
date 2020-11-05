import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { _api_getTrainerViews, _api_newSignUpCounts, _api_signinsCount } from 'src/app/_data/_apiRoute';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getNewSignUpCounts(from: string, to: string) {

    const params = new HttpParams().set('from', from.toString()).set('to', to.toString());

    return this.http.get(this.baseUrl + _api_newSignUpCounts, {params});
  }

  getSigninsCount(from: string, to: string) {

    const params = new HttpParams().set('from', from.toString()).set('to', to.toString());

    return this.http.get(this.baseUrl + _api_signinsCount, {params});
  }

  getCurrentTrainerViews() {
    return this.http.get(this.baseUrl + _api_getTrainerViews);
  }

  getTrainerViewsById(id: number) {
    return this.http.get(this.baseUrl + _api_getTrainerViews + '/' + id);
  }
}
