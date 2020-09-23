import { TestBed } from '@angular/core/testing';

import { ManageMyOrdersAuthGuardService } from './manage-my-orders-auth-guard.service';

describe('ManageMyOrdersAuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageMyOrdersAuthGuardService = TestBed.get(ManageMyOrdersAuthGuardService);
    expect(service).toBeTruthy();
  });
});
