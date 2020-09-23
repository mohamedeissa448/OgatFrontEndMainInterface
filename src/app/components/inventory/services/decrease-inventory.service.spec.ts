import { TestBed } from '@angular/core/testing';

import { DecreaseInventoryService } from './decrease-inventory.service';

describe('DecreaseInventoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DecreaseInventoryService = TestBed.get(DecreaseInventoryService);
    expect(service).toBeTruthy();
  });
});
