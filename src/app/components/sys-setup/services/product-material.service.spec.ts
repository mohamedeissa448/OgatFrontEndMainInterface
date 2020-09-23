import { TestBed } from '@angular/core/testing';

import { ProductMaterialService } from './product-material.service';

describe('ProductMaterialService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductMaterialService = TestBed.get(ProductMaterialService);
    expect(service).toBeTruthy();
  });
});
