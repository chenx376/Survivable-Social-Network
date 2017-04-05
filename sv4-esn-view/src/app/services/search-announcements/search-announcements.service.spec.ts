import {TestBed, inject, getTestBed} from '@angular/core/testing';

import { SearchAnnouncementsService } from './search-announcements.service';
import { Announcement } from "../../models/announcement.model";

describe('SearchAnnouncementsServiceTest', () => {

  let ans: {};

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        {
          provide: SearchAnnouncementsService,
          deps: [],
           useFactory:
             () => {
               let service = new SearchAnnouncementsService();
               service.announcements = //ADD 15 ANNOUNCEMENTS
                 [
                   new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}),
                   new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}),
                   new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}),
                   new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}),
                   new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}),
                   new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}),
                   new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}),
                   new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}),
                   new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}),
                   new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}),
                   new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}),
                   new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}),
                   new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}),
                   new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}),
                   new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}),
                 ];

               return service;
             }
        }

      ]
    });

    TestBed.compileComponents();

  });

  it('should Create the service', inject([SearchAnnouncementsService], (service: SearchAnnouncementsService) => {
    service = getTestBed().get(SearchAnnouncementsService);
    expect(service).not.toBeNull();
  }));

  it('should simulate retrieving announcements', inject([SearchAnnouncementsService], (service: SearchAnnouncementsService) => {
    service = getTestBed().get(SearchAnnouncementsService);

    expect(service.announcements).not.toBeNull();

  }));


  it('should simulate retrieving first 10 announcements', inject([SearchAnnouncementsService], (service: SearchAnnouncementsService) => {

    service = getTestBed().get(SearchAnnouncementsService);
    service.searchTerm = 'announcement';
    service.updateSearch();
    expect(service.displayedAnnouncements.length).toBe(10);

  }));

  it('should simulate pagination of the first 15 elements', inject([SearchAnnouncementsService], (service: SearchAnnouncementsService) => {

    service = getTestBed().get(SearchAnnouncementsService);
    service.searchTerm = 'announcement';
    service.updateSearch();
    service.loadMoreAnnouncementsButtonClicked();
    expect(service.displayedAnnouncements.length).toBe(15);

  }));

  it('should paginate 5 elements as well', inject([SearchAnnouncementsService], (service: SearchAnnouncementsService) => {

    service = getTestBed().get(SearchAnnouncementsService);

    service.announcements.push(new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "TEST"}));
    service.announcements.push(new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "TEST"}));
    service.announcements.push(new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "TEST"}));
    service.announcements.push(new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "TEST"}));
    service.announcements.push(new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "TEST"}));
    service.announcements.push(new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}));
    service.announcements.push(new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}));
    service.announcements.push(new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}));
    service.announcements.push(new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}));
    service.announcements.push(new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}));
    service.announcements.push(new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}));
    service.announcements.push(new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}));
    service.announcements.push(new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}));
    service.announcements.push(new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}));
    service.announcements.push(new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}));

    service.searchTerm = 'TEST';
    service.updateSearch();
    // service.loadMoreAnnouncementsButtonClicked(); //CLICK ONLY ONCE
    expect(service.displayedAnnouncements.length).toBe(5);

  }));

  it('should paginate more than SECOND PAGE 20 announcements correctly', inject([SearchAnnouncementsService], (service: SearchAnnouncementsService) => {

    service = getTestBed().get(SearchAnnouncementsService);


    service.announcements.push(new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}));
    service.announcements.push(new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}));
    service.announcements.push(new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}));
    service.announcements.push(new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}));
    service.announcements.push(new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}));
    service.announcements.push(new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}));
    service.announcements.push(new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}));
    service.announcements.push(new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}));
    service.announcements.push(new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}));
    service.announcements.push(new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}));


    service.searchTerm = 'announcement';
    service.updateSearch();
    service.loadMoreAnnouncementsButtonClicked(); //CLICK ONLY ONCE
    service.loadMoreAnnouncementsButtonClicked(); //CLICK ONLY ONCE
    expect(service.displayedAnnouncements.length).toBe(25);

  }));


  it('should handle STOP WORDS', inject([SearchAnnouncementsService], (service: SearchAnnouncementsService) => {

    service = getTestBed().get(SearchAnnouncementsService);

    //ADD TWO ELEMENTS WITH IS KEYWORD
    service.announcements.push(new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "is"}));
    service.announcements.push(new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "is"}));
    service.announcements.push(new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}));
    service.announcements.push(new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}));
    service.announcements.push(new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}));
    service.announcements.push(new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}));
    service.announcements.push(new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}));
    service.announcements.push(new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}));
    service.announcements.push(new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}));
    service.announcements.push(new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}));

    service.updateSearch();
    service.searchTerm = 'is';
    service.updateSearch();
    expect(service.displayedAnnouncements.length).toBe(25);

  }));

  it('should handle EMPTY SEARCH', inject([SearchAnnouncementsService], (service: SearchAnnouncementsService) => {

    service = getTestBed().get(SearchAnnouncementsService);

    //ADD TWO ELEMENTS WITH IS KEYWORD
    service.announcements.push(new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "is"}));
    service.announcements.push(new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}));
    service.announcements.push(new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}));
    service.announcements.push(new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}));
    service.announcements.push(new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}));
    service.announcements.push(new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}));
    service.announcements.push(new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}));
    service.announcements.push(new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}));
    service.announcements.push(new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}));
    service.announcements.push(new Announcement({"_id": "58e33a3478a1620011fd830d", "announcer": {"_id": "58e31be4d7f7ba00119171d1", "__v": 0, "location": null, "online": true, "status_information": null, "status": 3, "role": "CITIZEN", "updated_at": "1491278820791", "created_at": "1491278820791", "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email": null, "username": "yan"}, "__v": 0, "location": null, "created_at": "2017-04-04T06:16:20.398Z", "content": "new announcement"}));

    service.searchTerm = '';
    service.updateSearch();
    expect(service.displayedAnnouncements.length).toBe(25);

  }));


});
