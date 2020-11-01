import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTrainerComponent } from './all-trainer.component';

describe('AllTrainerComponent', () => {
  let component: AllTrainerComponent;
  let fixture: ComponentFixture<AllTrainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllTrainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
