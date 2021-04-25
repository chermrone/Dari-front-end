import { TestBed } from '@angular/core/testing';

import { RouterGuardDashbordcanActivateService } from './router-guard-dashbordcan-activate.service';

describe('RouterGuardDashbordcanActivateService', () => {
  let service: RouterGuardDashbordcanActivateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouterGuardDashbordcanActivateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
