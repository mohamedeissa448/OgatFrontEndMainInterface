import { TestBed } from '@angular/core/testing';

import { StoragePlacesService } from './storage-places.service';

describe('StoragePlacesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StoragePlacesService = TestBed.get(StoragePlacesService);
    expect(service).toBeTruthy();
  });
});
