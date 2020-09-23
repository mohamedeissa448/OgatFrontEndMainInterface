import { TestBed } from '@angular/core/testing';

import { PayToAffiliateService } from './pay-to-affiliate.service';

describe('PayToAffiliateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PayToAffiliateService = TestBed.get(PayToAffiliateService);
    expect(service).toBeTruthy();
  });
});
