import { TestBed } from '@angular/core/testing';

import { HttpgetService } from './httpget.service';

describe('HttpgetService', () => {
  let service: HttpgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
