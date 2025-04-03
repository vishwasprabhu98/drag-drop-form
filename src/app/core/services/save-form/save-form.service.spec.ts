import { TestBed } from '@angular/core/testing';

import { SaveFormService } from './save-form.service';

describe('SaveFormService', () => {
  let service: SaveFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
