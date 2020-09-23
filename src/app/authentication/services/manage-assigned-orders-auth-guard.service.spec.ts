import { TestBed } from '@angular/core/testing';

import { ManageAssignedOrdersAuthGuardService } from './manage-assigned-orders-auth-guard.service';

describe('ManageAssignedOrdersAuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageAssignedOrdersAuthGuardService = TestBed.get(ManageAssignedOrdersAuthGuardService);
    expect(service).toBeTruthy();
  });
});
