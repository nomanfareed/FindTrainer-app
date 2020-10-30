import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingletrainerComponent } from './singletrainer.component';

describe('SingletrainerComponent', () => {
  let component: SingletrainerComponent;
  let fixture: ComponentFixture<SingletrainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingletrainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingletrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
