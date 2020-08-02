import { TestBed } from '@angular/core/testing';

import { ConsultasInjectorService } from './consultas-injetor.service';

describe('InjectionService', () => {
  let service: ConsultasInjectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultasInjectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
