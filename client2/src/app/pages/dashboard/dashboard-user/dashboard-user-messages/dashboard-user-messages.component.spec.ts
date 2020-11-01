import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUserMessagesComponent } from './dashboard-user-messages.component';

describe('DashboardUserMessagesComponent', () => {
  let component: DashboardUserMessagesComponent;
  let fixture: ComponentFixture<DashboardUserMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardUserMessagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardUserMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
