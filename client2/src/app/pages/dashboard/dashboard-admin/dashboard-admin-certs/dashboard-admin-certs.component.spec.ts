import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAdminCertsComponent } from './dashboard-admin-certs.component';

describe('DashboardAdminCertsComponent', () => {
  let component: DashboardAdminCertsComponent;
  let fixture: ComponentFixture<DashboardAdminCertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardAdminCertsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAdminCertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
