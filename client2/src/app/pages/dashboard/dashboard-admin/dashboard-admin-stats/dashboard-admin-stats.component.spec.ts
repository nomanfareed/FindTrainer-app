import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAdminStatsComponent } from './dashboard-admin-stats.component';

describe('DashboardAdminStatsComponent', () => {
  let component: DashboardAdminStatsComponent;
  let fixture: ComponentFixture<DashboardAdminStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardAdminStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAdminStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
