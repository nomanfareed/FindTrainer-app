import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCertificationsComponent } from './display-certifications.component';

describe('DisplayCertificationsComponent', () => {
  let component: DisplayCertificationsComponent;
  let fixture: ComponentFixture<DisplayCertificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayCertificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayCertificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
