import { Component, OnInit } from '@angular/core';
import {
  IReviewUpdateForUser,
  ReviewUpdateForUser,
} from 'src/app/_model/_DTOs/IReviewForUpdateDto';
import { Gender } from 'src/app/_model/_Enum/Gender';

@Component({
  selector: 'app-dashboard-user-reviews',
  templateUrl: './dashboard-user-reviews.component.html',
  styleUrls: ['./dashboard-user-reviews.component.css'],
})
export class DashboardUserReviewsComponent {
  ReviewsSent: IReviewUpdateForUser[] = [
    new ReviewUpdateForUser('Tom'),
    new ReviewUpdateForUser('Sam'),
    new ReviewUpdateForUser('Jack'),
  ];
  constructor() {
    this.ImagesFilter();
  }

  ImagesFilter(): void {
    this.ReviewsSent = this.ReviewsSent.map((e) => {
      if (!e.ReceiverProfileUrl) {
        e.ReceiverProfileUrl =
          e.Gender === Gender.male ? 'assets/male.png' : 'assets/female.png';
      }
      return e;
    });
  }
}
