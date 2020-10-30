import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUserAccountComponent } from './dashboard-user-account.component';

describe('DashboardUserAccountComponent', () => {
  let component: DashboardUserAccountComponent;
  let fixture: ComponentFixture<DashboardUserAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardUserAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardUserAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
