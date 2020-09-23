import { TestBed } from '@angular/core/testing';

import { ManageShippingCompanyAuthGuardService } from './manage-shipping-company-auth-guard.service';

describe('ManageShippingCompanyAuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageShippingCompanyAuthGuardService = TestBed.get(ManageShippingCompanyAuthGuardService);
    expect(service).toBeTruthy();
  });
});
