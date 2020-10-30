import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-rating',
  template: `<div class="mt-2">
    <span [style.color]="'orange'" class="mr-1"
      ><b>{{ avgRating }}</b></span
    ><rating
      style="color: orange;"
      [(ngModel)]="avgRating"
      [max]="5"
      [readonly]="true"
    ></rating
    ><span [style.color]="'grey'" class="small ml-2"
      >({{ numberOfRatings | number }})</span
    >
  </div>`,
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent implements OnInit {
  @Input() avgRating: number;
  @Input() numberOfRatings: number;
  constructor() {}

  ngOnInit(): void {}
}
