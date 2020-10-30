import { TestBed } from '@angular/core/testing';

import { GenericsServiceService } from './generics-service.service';

describe('GenericsServiceService', () => {
  let service: GenericsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
