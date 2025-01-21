import { TestBed } from '@angular/core/testing';

import { ClientsTableService } from './clients-table.service';

describe('ClientsTableService', () => {
  let service: ClientsTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientsTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
