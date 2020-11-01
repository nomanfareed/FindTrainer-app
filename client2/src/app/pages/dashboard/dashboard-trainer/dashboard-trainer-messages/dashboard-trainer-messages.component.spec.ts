import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTrainerMessagesComponent } from './dashboard-trainer-messages.component';

describe('DashboardTrainerMessagesComponent', () => {
  let component: DashboardTrainerMessagesComponent;
  let fixture: ComponentFixture<DashboardTrainerMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardTrainerMessagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTrainerMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
