import { TestBed } from '@angular/core/testing';

import { ManageSupplierAuthGuardService } from './manage-supplier-auth-guard.service';

describe('ManageSupplierAuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageSupplierAuthGuardService = TestBed.get(ManageSupplierAuthGuardService);
    expect(service).toBeTruthy();
  });
});
