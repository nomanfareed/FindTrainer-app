import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAdminAccountComponent } from './dashboard-admin-account.component';

describe('DashboardAdminAccountComponent', () => {
  let component: DashboardAdminAccountComponent;
  let fixture: ComponentFixture<DashboardAdminAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardAdminAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAdminAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
