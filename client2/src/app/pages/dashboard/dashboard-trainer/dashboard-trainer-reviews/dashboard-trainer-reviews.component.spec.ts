import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTrainerReviewsComponent } from './dashboard-trainer-reviews.component';

describe('DashboardTrainerReviewsComponent', () => {
  let component: DashboardTrainerReviewsComponent;
  let fixture: ComponentFixture<DashboardTrainerReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardTrainerReviewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTrainerReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
