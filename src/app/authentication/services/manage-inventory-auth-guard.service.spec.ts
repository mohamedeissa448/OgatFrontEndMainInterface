import { TestBed } from '@angular/core/testing';

import { ManageInventoryAuthGuardService } from './manage-inventory-auth-guard.service';

describe('ManageInventoryAuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageInventoryAuthGuardService = TestBed.get(ManageInventoryAuthGuardService);
    expect(service).toBeTruthy();
  });
});
