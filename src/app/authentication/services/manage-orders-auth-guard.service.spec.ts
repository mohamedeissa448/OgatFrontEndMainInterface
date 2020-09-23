import { TestBed } from '@angular/core/testing';

import { ManageOrdersAuthGuardService } from './manage-orders-auth-guard.service';

describe('ManageOrdersAuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageOrdersAuthGuardService = TestBed.get(ManageOrdersAuthGuardService);
    expect(service).toBeTruthy();
  });
});
