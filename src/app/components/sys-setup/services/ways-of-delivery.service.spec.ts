import { TestBed } from '@angular/core/testing';

import { WaysOfDeliveryService } from './ways-of-delivery.service';

describe('WaysOfDeliveryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WaysOfDeliveryService = TestBed.get(WaysOfDeliveryService);
    expect(service).toBeTruthy();
  });
});
