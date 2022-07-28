import { TestBed } from '@angular/core/testing';

import { ConvertImageToTextService } from './convert-image-to-text.service';

describe('ConvertImageToTextService', () => {
  let service: ConvertImageToTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConvertImageToTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
