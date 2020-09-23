import { TestBed } from '@angular/core/testing';

import { WarehousingService } from './warehousing.service';

describe('WarehousingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WarehousingService = TestBed.get(WarehousingService);
    expect(service).toBeTruthy();
  });
});
