import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTrainerStatsComponent } from './dashboard-trainer-stats.component';

describe('DashboardTrainerStatsComponent', () => {
  let component: DashboardTrainerStatsComponent;
  let fixture: ComponentFixture<DashboardTrainerStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardTrainerStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTrainerStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
