import { TestBed } from '@angular/core/testing';

import { ReasonOfReturnOrderService } from './reason-of-return-order.service';

describe('ReasonOfReturnOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReasonOfReturnOrderService = TestBed.get(ReasonOfReturnOrderService);
    expect(service).toBeTruthy();
  });
});
