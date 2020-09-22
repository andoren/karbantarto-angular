import { TestBed } from '@angular/core/testing';

import { LoggedinguardGuard } from './loggedinguard.guard';

describe('LoggedinguardGuard', () => {
  let guard: LoggedinguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoggedinguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
