import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountTrainerFormComponent } from './account-trainer-form.component';

describe('AccountTrainerFormComponent', () => {
  let component: AccountTrainerFormComponent;
  let fixture: ComponentFixture<AccountTrainerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountTrainerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountTrainerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
