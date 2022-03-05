/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MeetingsService } from './meetings.service';

describe('Service: Meetings', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MeetingsService]
    });
  });

  it('should ...', inject([MeetingsService], (service: MeetingsService) => {
    expect(service).toBeTruthy();
  }));
});
