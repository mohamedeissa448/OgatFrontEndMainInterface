import { TestBed } from '@angular/core/testing';

import { DistributeOrdersService } from './distribute-orders.service';

describe('DistributeOrdersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DistributeOrdersService = TestBed.get(DistributeOrdersService);
    expect(service).toBeTruthy();
  });
});
