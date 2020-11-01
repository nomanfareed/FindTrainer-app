import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTrainerCertsComponent } from './single-trainer-certs.component';

describe('SingleTrainerCertsComponent', () => {
  let component: SingleTrainerCertsComponent;
  let fixture: ComponentFixture<SingleTrainerCertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleTrainerCertsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleTrainerCertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
