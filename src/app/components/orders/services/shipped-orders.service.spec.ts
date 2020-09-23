import { TestBed } from '@angular/core/testing';

import { ShippedOrdersService } from './shipped-orders.service';

describe('ShippedOrdersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShippedOrdersService = TestBed.get(ShippedOrdersService);
    expect(service).toBeTruthy();
  });
});
