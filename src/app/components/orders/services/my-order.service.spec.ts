import { TestBed } from '@angular/core/testing';

import { MyOrderService } from './my-order.service';

describe('MyOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyOrderService = TestBed.get(MyOrderService);
    expect(service).toBeTruthy();
  });
});
