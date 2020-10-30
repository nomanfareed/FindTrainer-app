import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTrainerAccountComponent } from './dashboard-trainer-account.component';

describe('DashboardTrainerAccountComponent', () => {
  let component: DashboardTrainerAccountComponent;
  let fixture: ComponentFixture<DashboardTrainerAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardTrainerAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTrainerAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
