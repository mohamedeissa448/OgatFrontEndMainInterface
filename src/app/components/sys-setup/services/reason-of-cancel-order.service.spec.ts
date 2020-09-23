import { TestBed } from '@angular/core/testing';

import { ReasonOfCancelOrderService } from './reason-of-cancel-order.service';

describe('ReasonOfCancelOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReasonOfCancelOrderService = TestBed.get(ReasonOfCancelOrderService);
    expect(service).toBeTruthy();
  });
});
