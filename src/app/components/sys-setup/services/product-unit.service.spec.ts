import { TestBed } from '@angular/core/testing';

import { ProductUnitService } from './product-unit.service';

describe('ProductUnitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductUnitService = TestBed.get(ProductUnitService);
    expect(service).toBeTruthy();
  });
});
