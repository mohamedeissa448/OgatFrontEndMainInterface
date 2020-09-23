import { TestBed } from '@angular/core/testing';

import { SupplierPaymentsService } from './supplier-payments.service';

describe('SupplierPaymentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SupplierPaymentsService = TestBed.get(SupplierPaymentsService);
    expect(service).toBeTruthy();
  });
});
