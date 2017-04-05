import { TestBed, inject } from '@angular/core/testing';

import { SearchAnnouncementsService } from './search-announcements.service';

describe('AnnouncementsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchAnnouncementsService]
    });
  });

  it('should ...', inject([SearchAnnouncementsService], (service: SearchAnnouncementsService) => {
    expect(service).toBeTruthy();
  }));


  it('should do something ...', inject([SearchAnnouncementsService], (service: SearchAnnouncementsService) => {
    // expect(service.doSomething()).toBeTruthy();
  }));

});
