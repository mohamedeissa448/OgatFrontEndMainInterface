import { TestBed } from '@angular/core/testing';

import { ManageCustomerAuthGuardService } from './manage-customer-auth-guard.service';

describe('ManageCustomerAuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageCustomerAuthGuardService = TestBed.get(ManageCustomerAuthGuardService);
    expect(service).toBeTruthy();
  });
});
