import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTrainerReviewsComponent } from './single-trainer-reviews.component';

describe('SingleTrainerReviewsComponent', () => {
  let component: SingleTrainerReviewsComponent;
  let fixture: ComponentFixture<SingleTrainerReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleTrainerReviewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleTrainerReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
