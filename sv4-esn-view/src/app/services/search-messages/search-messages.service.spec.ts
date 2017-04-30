import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { SearchMessagesService } from './search-messages.service';
import { Message } from "../../models/message.model";

describe('SearchMessagesServiceTest', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SearchMessagesService,
          deps: [],
          useFactory:
            () => {
              let service = new SearchMessagesService();
              service.messages = //ADD 15 ANNOUNCEMENTS
                [];

              for(let i = 0; i < 15; i++)
                service.messages.push(new Message({"_id" : "58e4553628baff001153dd1c", "sender" : {"_id" : "58e31be4d7f7ba00119171d1", "location" : null, "online" : true, "status_information" : null, "status" : 3, "role" : "CITIZEN", "updated_at" : "1491278820791", "created_at" : "1491278820791", "password" : "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email" : null, "username" : "yan", "active": true, "__v" : 0}, "message" : "MESSAGE", "receiver" : null, "broadcast" : true, "sent_at" : "2017-04-05T02:23:50.609Z", "user_status_information" : "OKOK", "user_status" : 1, "__v" : 0}));

              return service;
            }
        }
      ]
    });

    TestBed.compileComponents();

  });

  it('should Create the service', inject([SearchMessagesService], (service: SearchMessagesService) => {
    let msg = new Message({"_id" : "58e4553628baff001153dd1c", "sender" : {"_id" : "58e31be4d7f7ba00119171d1", "location" : null, "online" : true, "status_information" : null, "status" : 3, "role" : "CITIZEN", "updated_at" : "1491278820791", "created_at" : "1491278820791", "password" : "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email" : null, "username" : "yan", "active": true, "__v" : 0}, "message" : "MESSAGE", "receiver" : null, "broadcast" : true, "sent_at" : "2017-04-05T02:23:50.609Z", "user_status_information" : "OKOK", "user_status" : 1, "__v" : 0});
    expect(msg.content).toBe("MESSAGE");
  }));

  it('should Create the service', inject([SearchMessagesService], (service: SearchMessagesService) => {
    service = getTestBed().get(SearchMessagesService);
    expect(service).not.toBeNull();
  }));

  it('should simulate retrieving messages', inject([SearchMessagesService], (service: SearchMessagesService) => {
    service = getTestBed().get(SearchMessagesService);
    expect(service.messages).not.toBeNull();
  }));

  it('should clear emergencySupplies', inject([SearchMessagesService], (service: SearchMessagesService) => {
    service = getTestBed().get(SearchMessagesService);
    service.reset();
    expect(service.displayedMessages.length).toBe(0);
  }));

  it('should simulate retrieving first 10 emergencySupplies', inject([SearchMessagesService], (service: SearchMessagesService) => {
    service = getTestBed().get(SearchMessagesService);
    service.updateSearch();
    service.searchTerm = 'MESSAGE';
    service.updateSearch();
    expect(service.displayedMessages.length).toBe(10);
  }));

  it('should simulate pagination of the first 15 elements', inject([SearchMessagesService], (service: SearchMessagesService) => {
    service = getTestBed().get(SearchMessagesService);
    service.updateSearch();
    service.searchTerm = 'MESSAGE';
    service.updateSearch();
    service.loadMoreMessagesButtonClicked();
    expect(service.displayedMessages.length).toBe(15);
  }));

  it('should paginate 5 elements as well', inject([SearchMessagesService], (service: SearchMessagesService) => {
    service = getTestBed().get(SearchMessagesService);

    for(let i=0; i<5;i++)
      service.messages.push(new Message({"_id" : "58e4553628baff001153dd1c", "sender" : {"_id" : "58e31be4d7f7ba00119171d1", "location" : null, "online" : true, "status_information" : null, "status" : 3, "active":true, "role" : "CITIZEN", "updated_at" : "1491278820791", "created_at" : "1491278820791", "password" : "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email" : null, "username" : "yan", "__v" : 0}, "message" : "TEST", "TEST" : null, "broadcast" : true, "sent_at" : "2017-04-05T02:23:50.609Z", "user_status_information" : "OKOK", "user_status" : 1, "__v" : 0}));

    for(let i=0; i<5; i++)
      service.messages.push(new Message({"_id" : "58e4553628baff001153dd1c", "sender" : {"_id" : "58e31be4d7f7ba00119171d1", "location" : null, "online" : true, "status_information" : null, "status" : 3, "active":true, "role" : "CITIZEN", "updated_at" : "1491278820791", "created_at" : "1491278820791", "password" : "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email" : null, "username" : "yan", "__v" : 0}, "message" : "MESSAGE", "receiver" : null, "broadcast" : true, "sent_at" : "2017-04-05T02:23:50.609Z", "user_status_information" : "OKOK", "user_status" : 1, "__v" : 0}));

    service.updateSearch();
    service.searchTerm = 'TEST';
    service.updateSearch();
    expect(service.displayedMessages.length).toBe(5);
  }));

  it('should paginate more than SECOND PAGE 20 messages correctly', inject([SearchMessagesService], (service: SearchMessagesService) => {
    service = getTestBed().get(SearchMessagesService);

    for(let i=0; i<10; i++)
      service.messages.push(new Message({"_id" : "58e4553628baff001153dd1c", "sender" : {"_id" : "58e31be4d7f7ba00119171d1", "location" : null, "online" : true, "status_information" : null, "status" : 3, "active": true, "role" : "CITIZEN", "updated_at" : "1491278820791", "created_at" : "1491278820791", "password" : "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email" : null, "username" : "yan", "__v" : 0}, "message" : "MESSAGE", "receiver" : {"_id" : "58e31be4d7f7ba00119171d1", "location" : null, "online" : true, "status_information" : null, "status" : 3, "role" : "CITIZEN", "updated_at" : "1491278820791", "created_at" : "1491278820791", "password" : "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email" : null, "username" : "yan", "__v" : 0}, "broadcast" : true, "sent_at" : "2017-04-05T02:23:50.609Z", "user_status_information" : "OKOK", "user_status" : 1, "__v" : 0}));

    service.updateSearch();
    service.searchTerm = 'MESSAGE';
    service.updateSearch();
    service.loadMoreMessagesButtonClicked(); //CLICK ONLY ONCE
    service.loadMoreMessagesButtonClicked(); //CLICK ONLY ONCE
    expect(service.displayedMessages.length).toBe(25);

  }));

  it('should handle STOP WORDS', inject([SearchMessagesService], (service: SearchMessagesService) => {
    service = getTestBed().get(SearchMessagesService);

    for(let i = 0; i < 10; i++)
      service.messages.push(new Message({"_id" : "58e4553628baff001153dd1c", "sender" : {"_id" : "58e31be4d7f7ba00119171d1", "location" : null, "online" : true, "status_information" : null, "status" : 3, "active": true, "role" : "CITIZEN", "updated_at" : "1491278820791", "created_at" : "1491278820791", "password" : "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email" : null, "username" : "yan", "__v" : 0}, "message" : "MESSAGE", "receiver" : null, "broadcast" : true, "sent_at" : "2017-04-05T02:23:50.609Z", "user_status_information" : "OKOK", "user_status" : 1, "__v" : 0}));

    service.updateSearch();
    service.searchTerm = 'is';
    service.updateSearch();
    expect(service.displayedMessages.length).toBe(10);
  }));

  it('should handle EMPTY SEARCH', inject([SearchMessagesService], (service: SearchMessagesService) => {
    service = getTestBed().get(SearchMessagesService);

    for( let i=0; i<10; i++)
      service.messages.push(new Message({"_id" : "58e4553628baff001153dd1c", "sender" : {"_id" : "58e31be4d7f7ba00119171d1", "location" : null, "online" : true, "status_information" : null, "status" : 3, "active":true, "role" : "CITIZEN", "updated_at" : "1491278820791", "created_at" : "1491278820791", "password" : "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email" : null, "username" : "yan", "__v" : 0}, "message" : "MESSAGE", "receiver" : null, "broadcast" : true, "sent_at" : "2017-04-05T02:23:50.609Z", "user_status_information" : "OKOK", "user_status" : 1, "__v" : 0}));

    service.updateSearch();
    service.searchTerm = '';
    service.updateSearch();
    expect(service.displayedMessages.length).toBe(10);
  }));

});
