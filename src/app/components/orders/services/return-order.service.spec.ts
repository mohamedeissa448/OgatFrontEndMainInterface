import { TestBed } from '@angular/core/testing';

import { ReturnOrderService } from './return-order.service';

describe('ReturnOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReturnOrderService = TestBed.get(ReturnOrderService);
    expect(service).toBeTruthy();
  });
});
