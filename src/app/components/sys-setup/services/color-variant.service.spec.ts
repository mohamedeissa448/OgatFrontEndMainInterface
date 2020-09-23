import { TestBed } from '@angular/core/testing';

import { ColorVariantService } from './color-variant.service';

describe('ColorVariantService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ColorVariantService = TestBed.get(ColorVariantService);
    expect(service).toBeTruthy();
  });
});
