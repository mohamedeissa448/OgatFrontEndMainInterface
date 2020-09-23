import { TestBed } from '@angular/core/testing';

import { ManageProductAuthGuardService } from './manage-product-auth-guard.service';

describe('ManageProductAuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageProductAuthGuardService = TestBed.get(ManageProductAuthGuardService);
    expect(service).toBeTruthy();
  });
});
