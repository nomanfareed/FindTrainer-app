import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { _api_addPhoto, _api_getPhoto } from 'src/app/_data/_apiRoute';
import { IPhotoForCreationDto } from 'src/app/_model/_DTOs/IPhotoForCreationDto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPhotoById(photoId: number) {
    return this.http.get(this.baseUrl + _api_getPhoto + '/' + photoId);
  }

  addPhotoForUser(model: IPhotoForCreationDto) {
    return this.http.post(this.baseUrl + _api_addPhoto, model);
  }

}
