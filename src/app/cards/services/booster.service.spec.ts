import { TestBed } from '@angular/core/testing';

import { BoosterService } from './booster.service';

describe('BoosterService', () => {
  let service: BoosterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoosterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
