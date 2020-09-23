import { TestBed } from '@angular/core/testing';

import { ManageMyShippedOrdersAuthGuardService } from './manage-my-shipped-orders-auth-guard.service';

describe('ManageMyShippedOrdersAuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageMyShippedOrdersAuthGuardService = TestBed.get(ManageMyShippedOrdersAuthGuardService);
    expect(service).toBeTruthy();
  });
});
