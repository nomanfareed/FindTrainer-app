import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTrainerCertsComponent } from './dashboard-trainer-certs.component';

describe('DashboardTrainerCertsComponent', () => {
  let component: DashboardTrainerCertsComponent;
  let fixture: ComponentFixture<DashboardTrainerCertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardTrainerCertsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTrainerCertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
