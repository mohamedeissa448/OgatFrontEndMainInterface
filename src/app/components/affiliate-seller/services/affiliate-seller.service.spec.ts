import { TestBed } from '@angular/core/testing';

import { AffiliateSellerService } from './affiliate-seller.service';

describe('AffiliateSellerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AffiliateSellerService = TestBed.get(AffiliateSellerService);
    expect(service).toBeTruthy();
  });
});
