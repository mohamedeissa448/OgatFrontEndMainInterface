import { TestBed } from '@angular/core/testing';

import { ReturnBillService } from './return-bill.service';

describe('ReturnBillService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReturnBillService = TestBed.get(ReturnBillService);
    expect(service).toBeTruthy();
  });
});
