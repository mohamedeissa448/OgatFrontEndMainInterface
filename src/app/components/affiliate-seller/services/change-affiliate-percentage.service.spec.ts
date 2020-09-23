import { TestBed } from '@angular/core/testing';

import { ChangeAffiliatePercentageService } from './change-affiliate-percentage.service';

describe('ChangeAffiliatePercentageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChangeAffiliatePercentageService = TestBed.get(ChangeAffiliatePercentageService);
    expect(service).toBeTruthy();
  });
});
