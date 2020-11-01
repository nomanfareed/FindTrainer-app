import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUserReviewsComponent } from './dashboard-user-reviews.component';

describe('DashboardUserReviewsComponent', () => {
  let component: DashboardUserReviewsComponent;
  let fixture: ComponentFixture<DashboardUserReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardUserReviewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardUserReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
