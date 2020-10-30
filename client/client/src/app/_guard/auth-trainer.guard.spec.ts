import { TestBed } from '@angular/core/testing';

import { AuthTrainerGuard } from './auth-trainer.guard';

describe('AuthTrainerGuard', () => {
  let guard: AuthTrainerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthTrainerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
