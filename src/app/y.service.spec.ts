import { TestBed } from '@angular/core/testing';

import { YService } from './y.service';

describe('YService', () => {
  let service: YService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
