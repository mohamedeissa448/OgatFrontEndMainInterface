import { TestBed } from '@angular/core/testing';

import { ManageAffiliateSellerAuthGuardService } from './manage-affiliate-seller-auth-guard.service';

describe('ManageAffiliateSellerAuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageAffiliateSellerAuthGuardService = TestBed.get(ManageAffiliateSellerAuthGuardService);
    expect(service).toBeTruthy();
  });
});
