import { TestBed } from '@angular/core/testing';

import { GoogleFormService } from './google-form.service';

describe('GoogleFormService', () => {
  let service: GoogleFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
