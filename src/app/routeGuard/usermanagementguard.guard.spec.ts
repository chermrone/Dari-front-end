import { TestBed } from '@angular/core/testing';

import { UsermanagementguardGuard } from './usermanagementguard.guard';

describe('UsermanagementguardGuard', () => {
  let guard: UsermanagementguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UsermanagementguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
