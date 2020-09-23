import { TestBed } from '@angular/core/testing';

import { StoreReportService } from './store-report.service';

describe('StoreReportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StoreReportService = TestBed.get(StoreReportService);
    expect(service).toBeTruthy();
  });
});
