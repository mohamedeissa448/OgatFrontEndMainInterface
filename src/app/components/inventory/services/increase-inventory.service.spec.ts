import { TestBed } from '@angular/core/testing';

import { IncreaseInventoryService } from './increase-inventory.service';

describe('IncreaseInventoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IncreaseInventoryService = TestBed.get(IncreaseInventoryService);
    expect(service).toBeTruthy();
  });
});
