import { TestBed } from '@angular/core/testing';

import { ManageCancelledOrdersAuthGuardService } from './manage-cancelled-orders-auth-guard.service';

describe('ManageCancelledOrdersAuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageCancelledOrdersAuthGuardService = TestBed.get(ManageCancelledOrdersAuthGuardService);
    expect(service).toBeTruthy();
  });
});
