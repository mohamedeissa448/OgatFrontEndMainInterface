import { TestBed } from '@angular/core/testing';

import { AssignedOrdersService } from './assigned-orders.service';

describe('AssignedOrdersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssignedOrdersService = TestBed.get(AssignedOrdersService);
    expect(service).toBeTruthy();
  });
});
