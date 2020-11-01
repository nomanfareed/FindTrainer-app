import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAdminMessagesComponent } from './dashboard-admin-messages.component';

describe('DashboardAdminMessagesComponent', () => {
  let component: DashboardAdminMessagesComponent;
  let fixture: ComponentFixture<DashboardAdminMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardAdminMessagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAdminMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
