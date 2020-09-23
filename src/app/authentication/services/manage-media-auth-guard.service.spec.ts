import { TestBed } from '@angular/core/testing';

import { ManageMediaAuthGuardService } from './manage-media-auth-guard.service';

describe('ManageMediaAuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageMediaAuthGuardService = TestBed.get(ManageMediaAuthGuardService);
    expect(service).toBeTruthy();
  });
});
