import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTrainerWriteReviewComponent } from './single-trainer-write-review.component';

describe('SingleTrainerWriteReviewComponent', () => {
  let component: SingleTrainerWriteReviewComponent;
  let fixture: ComponentFixture<SingleTrainerWriteReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleTrainerWriteReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleTrainerWriteReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
