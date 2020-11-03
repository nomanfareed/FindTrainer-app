import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutsiderComponent } from './outsider.component';

describe('OutsiderComponent', () => {
  let component: OutsiderComponent;
  let fixture: ComponentFixture<OutsiderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutsiderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutsiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
