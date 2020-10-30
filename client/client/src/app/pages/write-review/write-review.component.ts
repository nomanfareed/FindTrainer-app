import { ReviewDTO } from './../../_model/_Dto/ReviewDTO';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReviewService } from 'src/app/_services/review.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-write-review',
  templateUrl: './write-review.component.html',
  styleUrls: ['./write-review.component.css'],
})
export class WriteReviewComponent {
  ReviewForm: FormGroup;
  initData: ReviewDTO = new ReviewDTO();
  imageUrl: string = null;
  maxScore: number[] = [...Array(6).keys()];
  constructor(private fb: FormBuilder, private RS: ReviewService) {
    this.initForm();
  }

  private initForm(): void {
    this.initData = new ReviewDTO();
    const { stars, content } = this.initData;
    this.ReviewForm = this.fb.group({
      stars: [stars, [Validators.required]],
      content: [
        content,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(300),
        ],
      ],
    });
  }

  submitFunc(): void {
    const data: ReviewDTO = {
      ...this.initData,
      ...this.ReviewForm.value,
      imageUrl: this.imageUrl,
    };
    this.initForm();
    this.RS.SendReview(data);
  }
}
