import { TestBed } from '@angular/core/testing';

import { ManageUserAuthGuardService } from './manage-user-auth-guard.service';

describe('ManageUserAuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageUserAuthGuardService = TestBed.get(ManageUserAuthGuardService);
    expect(service).toBeTruthy();
  });
});
