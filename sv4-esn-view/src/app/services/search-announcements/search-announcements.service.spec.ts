import {TestBed, inject, getTestBed} from '@angular/core/testing';

import { SearchAnnouncementsService } from './search-announcements.service';
import { Announcement } from "../../models/announcement.model";

describe('SearchAnnouncementsServiceTest', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        {
          provide: SearchAnnouncementsService,
          deps: [],
           useFactory:
             () => {
               return new SearchAnnouncementsService();
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

    service.announcements = [
      new Announcement({
        "_id": "58e33a3478a1620011fd830d",
        "announcer": {
          "_id": "58e31be4d7f7ba00119171d1",
          "__v": 0,
          "location": null,
          "online": true,
          "status_information": null,
          "status": 3,
          "role": "CITIZEN",
          "updated_at": "1491278820791",
          "created_at": "1491278820791",
          "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
          "email": null,
          "username": "yan"
        },
        "__v": 0,
        "location": null,
        "created_at": "2017-04-04T06:16:20.398Z",
        "content": "new announcement"
      }),
      new Announcement({
        "_id": "58e3430f78a1620011fd8313",
        "announcer": {
          "_id": "58e31be4d7f7ba00119171d1",
          "__v": 0,
          "location": null,
          "online": true,
          "status_information": null,
          "status": 3,
          "role": "CITIZEN",
          "updated_at": "1491278820791",
          "created_at": "1491278820791",
          "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
          "email": null,
          "username": "yan"
        },
        "__v": 0,
        "location": null,
        "created_at": "2017-04-04T06:54:07.406Z",
        "content": "another announcement"
      }),
      new Announcement({
        "_id": "58e43a6128baff001153dd07",
        "announcer": {
          "_id": "58e2d1cfc2bf96001119fa63",
          "__v": 0,
          "location": null,
          "online": true,
          "status_information": "OKOK",
          "status": 1,
          "role": "CITIZEN",
          "updated_at": "1491259855001",
          "created_at": "1491259855001",
          "password": "bcb15f821479b4d5772bd0ca866c00ad5f926e3580720659cc80d39c9d09802a",
          "email": null,
          "username": "bqin"
        },
        "__v": 0,
        "location": null,
        "created_at": "2017-04-05T00:29:21.659Z",
        "content": "111"
      }),
      new Announcement({
        "_id": "58e43a6328baff001153dd08",
        "announcer": {
          "_id": "58e2d1cfc2bf96001119fa63",
          "__v": 0,
          "location": null,
          "online": true,
          "status_information": "OKOK",
          "status": 1,
          "role": "CITIZEN",
          "updated_at": "1491259855001",
          "created_at": "1491259855001",
          "password": "bcb15f821479b4d5772bd0ca866c00ad5f926e3580720659cc80d39c9d09802a",
          "email": null,
          "username": "bqin"
        },
        "__v": 0,
        "location": null,
        "created_at": "2017-04-05T00:29:23.728Z",
        "content": "111"
      }),
      new Announcement({
        "_id": "58e43a6528baff001153dd09",
        "announcer": {
          "_id": "58e2d1cfc2bf96001119fa63",
          "__v": 0,
          "location": null,
          "online": true,
          "status_information": "OKOK",
          "status": 1,
          "role": "CITIZEN",
          "updated_at": "1491259855001",
          "created_at": "1491259855001",
          "password": "bcb15f821479b4d5772bd0ca866c00ad5f926e3580720659cc80d39c9d09802a",
          "email": null,
          "username": "bqin"
        },
        "__v": 0,
        "location": null,
        "created_at": "2017-04-05T00:29:25.255Z",
        "content": "111"
      }),
      new Announcement({
        "_id": "58e43a6628baff001153dd0a",
        "announcer": {
          "_id": "58e2d1cfc2bf96001119fa63",
          "__v": 0,
          "location": null,
          "online": true,
          "status_information": "OKOK",
          "status": 1,
          "role": "CITIZEN",
          "updated_at": "1491259855001",
          "created_at": "1491259855001",
          "password": "bcb15f821479b4d5772bd0ca866c00ad5f926e3580720659cc80d39c9d09802a",
          "email": null,
          "username": "bqin"
        },
        "__v": 0,
        "location": null,
        "created_at": "2017-04-05T00:29:26.953Z",
        "content": "111"
      })
    ];

    expect(service.announcements).not.toBeNull();

  }));

});
