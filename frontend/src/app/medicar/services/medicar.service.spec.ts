import { TestBed } from '@angular/core/testing';

import { MedicarService } from './medicar.service';

describe('MedicarService', () => {
  let service: MedicarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
