import {
  _collection_messages,
  _collection_reviews,
} from './../_data/_collections';
import { ReviewDTO } from './../_model/_Dto/ReviewDTO';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';
import { GenericsServiceService } from './generics-service.service';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(
    private AS: AuthService,
    private toastr: ToastrService,
    private GS: GenericsServiceService
  ) {}
  SendReview(review: ReviewDTO): void {
    this.AS.CurrentUser$.subscribe(
      async (res) => {
        console.log('res', res);
        if (!res.uid) {
          this.toastr.error('You must login to write review');
        } else {
          review.receiverId = res.browseTrainerId;
          review.senderId = res.uid;
          await this.GS.addDoc(review, _collection_reviews);
          this.toastr.success('Thank you for your review!');
        }
      },
      () =>
        this.toastr.error(
          'Sorry! We are unable to send this review at this time, please try again later.'
        )
    ).unsubscribe();
  }
}
