import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAdminReviewsComponent } from './dashboard-admin-reviews.component';

describe('DashboardAdminReviewsComponent', () => {
  let component: DashboardAdminReviewsComponent;
  let fixture: ComponentFixture<DashboardAdminReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardAdminReviewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAdminReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
