import { TestBed } from '@angular/core/testing';

import { CancelledOrdersService } from './cancelled-orders.service';

describe('CancelledOrdersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CancelledOrdersService = TestBed.get(CancelledOrdersService);
    expect(service).toBeTruthy();
  });
});
