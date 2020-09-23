import { TestBed } from '@angular/core/testing';

import { CanLogInAuthGuardService } from './can-log-in-auth-guard.service';

describe('CanLogInAuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CanLogInAuthGuardService = TestBed.get(CanLogInAuthGuardService);
    expect(service).toBeTruthy();
  });
});
