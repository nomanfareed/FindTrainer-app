import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBaseUserComponent } from './update-base-user.component';

describe('UpdateBaseUserComponent', () => {
  let component: UpdateBaseUserComponent;
  let fixture: ComponentFixture<UpdateBaseUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateBaseUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBaseUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
