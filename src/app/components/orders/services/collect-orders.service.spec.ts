import { TestBed } from '@angular/core/testing';

import { CollectOrdersService } from './collect-orders.service';

describe('CollectOrdersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CollectOrdersService = TestBed.get(CollectOrdersService);
    expect(service).toBeTruthy();
  });
});
