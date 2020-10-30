import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTrainerComponent } from './dashboard-trainer.component';

describe('DashboardTrainerComponent', () => {
  let component: DashboardTrainerComponent;
  let fixture: ComponentFixture<DashboardTrainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardTrainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
