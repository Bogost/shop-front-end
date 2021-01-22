import { TestBed } from '@angular/core/testing';

import { AntiauthGuard } from './antiauth.guard';

describe('AntiauthGuard', () => {
  let guard: AntiauthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AntiauthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
