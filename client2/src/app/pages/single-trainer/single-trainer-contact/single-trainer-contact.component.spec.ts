import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTrainerContactComponent } from './single-trainer-contact.component';

describe('SingleTrainerContactComponent', () => {
  let component: SingleTrainerContactComponent;
  let fixture: ComponentFixture<SingleTrainerContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleTrainerContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleTrainerContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
