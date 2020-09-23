import { TestBed } from '@angular/core/testing';

import { SizeVariantsService } from './size-variants.service';

describe('SizeVariantsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SizeVariantsService = TestBed.get(SizeVariantsService);
    expect(service).toBeTruthy();
  });
});
