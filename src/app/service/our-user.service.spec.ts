import { TestBed } from '@angular/core/testing';

import { OurUserService } from './our-user.service';

describe('OurUserService', () => {
  let service: OurUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OurUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
