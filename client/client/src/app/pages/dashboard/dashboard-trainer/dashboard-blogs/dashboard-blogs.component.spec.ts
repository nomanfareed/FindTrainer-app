import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBlogsComponent } from './dashboard-blogs.component';

describe('DashboardBlogsComponent', () => {
  let component: DashboardBlogsComponent;
  let fixture: ComponentFixture<DashboardBlogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardBlogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
