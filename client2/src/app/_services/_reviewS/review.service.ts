import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { _api_addReview, _api_deleteReview, _api_getReviewsForTrainer } from 'src/app/_data/_apiRoute';
import { IReviewForCreationDto } from 'src/app/_model/_DTOs/IReviewForCreationDto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addReview(model: IReviewForCreationDto) {
    return this.http.post(this.baseUrl + _api_addReview + '/' + model.RecieverId, model);
  }

  deleteReview(reviewId: number) {
    return this.http.delete(this.baseUrl + _api_deleteReview + '/' + reviewId);
  }

  getReviewsForTrainer(trainerId: number, page: number) {
    const params = new HttpParams().set('trainerId', trainerId.toString()).set('page', page.toString());

    return this.http.get(this.baseUrl + _api_getReviewsForTrainer, {params});
  }
}
