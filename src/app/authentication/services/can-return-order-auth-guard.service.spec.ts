import { TestBed } from '@angular/core/testing';

import { CanReturnOrderAuthGuardService } from './can-return-order-auth-guard.service';

describe('CanReturnOrderAuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CanReturnOrderAuthGuardService = TestBed.get(CanReturnOrderAuthGuardService);
    expect(service).toBeTruthy();
  });
});
