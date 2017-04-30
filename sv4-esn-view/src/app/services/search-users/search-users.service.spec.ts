import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { SearchUsersService } from './search-users.service';
import { User } from "../../models/user.model";

describe('SearchUsersServiceTest', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SearchUsersService,
          deps: [],
          useFactory:
            () => {
              let service = new SearchUsersService();
              service.currentLoggedInUserRole = 'ADMIN';
              service.users = [];
              for(let i = 0; i < 15; i++)
                service.users.push( new User({"_id" : "58e31be4d7f7ba00119171d1", "active": true, "location" : null, "online" : true, "status_information" : null, "status" : 3, "role" : "CITIZEN", "updated_at" : "1491278820791", "created_at" : "1491278820791", "password" : "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email" : null, "username" : "yan", "__v" : 0}) );

              return service;
            }
        }
      ]
    });
    TestBed.compileComponents();
  });

  it('should Create the service', inject([SearchUsersService], (service: SearchUsersService) => {
    let user = new User({"_id" : "58e31be4d7f7ba00119171d1","active": true,"location" : null, "online" : true, "status_information" : null, "status" : 3, "role" : "CITIZEN", "updated_at" : "1491278820791", "created_at" : "1491278820791", "password" : "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email" : null, "username" : "yan", "__v" : 0});
    expect(user.username).toBe("yan");
  }));

  it('should Create the service', inject([SearchUsersService], (service: SearchUsersService) => {
    service = getTestBed().get(SearchUsersService);
    expect(service).not.toBeNull();
  }));

  it('should simulate retrieving users', inject([SearchUsersService], (service: SearchUsersService) => {
    service = getTestBed().get(SearchUsersService);
    expect(service.users).not.toBeNull();
  }));

  it('should clear users', inject([SearchUsersService], (service: SearchUsersService) => {
    service = getTestBed().get(SearchUsersService);
    service.reset();
    expect(service.filteredUsers.length).toBe(0);
  }));

  it('should search users', inject([SearchUsersService], (service: SearchUsersService) => {
    service = getTestBed().get(SearchUsersService);

    service.currentLoggedInUserRole = 'ADMIN';

    for(let i = 0; i < 5; i++)
      service.users.push(new User({"_id" : "58e31be4d7f7ba00119171d1", "active": true, "location" : null, "online" : true, "status_information" : null, "status" : 3, "role" : "CITIZEN", "updated_at" : "1491278820791", "created_at" : "1491278820791", "password" : "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email" : null, "username" : "TEST", "__v" : 0}));

    service.updateSearch();
    service.searchTerm = 'TEST';
    service.updateSearch();
    expect(service.filteredUsers.length).toBe(5);
  }));

  it('should search users BY STATUS OK', inject([SearchUsersService], (service: SearchUsersService) => {
    service = getTestBed().get(SearchUsersService);

    service.currentLoggedInUserRole = 'CITIZEN';

    for(let i = 0; i < 4; i++)
      service.users.push(new User({"_id" : "58e31be4d7f7ba00119171d1", "active": true, "location" : null, "online" : true, "status_information" : null, "status" : 1, "role" : "CITIZEN", "updated_at" : "1491278820791", "created_at" : "1491278820791", "password" : "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email" : null, "username" : "TEST", "__v" : 0}));

    service.searchTerm = 'TEST';
    service.statusOKSelected();

    service.updateSearch();

    expect(service.filteredUsers.length).toBeGreaterThan(0);
  }));

  it('should search users BY STATUS EMERGENCY', inject([SearchUsersService], (service: SearchUsersService) => {
    service = getTestBed().get(SearchUsersService);

    service.currentLoggedInUserRole = 'ADMIN';

    for(let i = 0; i < 4; i++)
      service.users.push(new User({"_id" : "58e31be4d7f7ba00119171d1","active": true, "location" : null, "online" : true, "status_information" : null, "status" : 3, "role" : "CITIZEN", "updated_at" : "1491278820791", "created_at" : "1491278820791", "password" : "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email" : null, "username" : "TEST", "__v" : 0}));

    service.searchTerm = 'TEST';

    service.updateSearch();
    service.statusEmergencySelected();
    expect(service.filteredUsers.length).toBeGreaterThan(0);
  }));

  it('should search users BY STATUS HELP', inject([SearchUsersService], (service: SearchUsersService) => {
    service = getTestBed().get(SearchUsersService);

    service.currentLoggedInUserRole = 'ADMIN';

    for(let i = 0; i < 4; i++)
      service.users.push(new User({"_id" : "58e31be4d7f7ba00119171d1", "location" : null, "online" : true, "status_information" : null, "status" : 2, "role" : "CITIZEN", "updated_at" : "1491278820791", "created_at" : "1491278820791", "password" : "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email" : null, "username" : "TEST", "__v" : 0}));

    service.updateSearch();
    service.searchTerm = 'TEST';
    service.statusHelpSelected();
    expect(service.filteredUsers.length).toBeGreaterThan(0);
  }));

  it('should search users BY STATUS CLEAR', inject([SearchUsersService], (service: SearchUsersService) => {
    service = getTestBed().get(SearchUsersService);

    service.currentLoggedInUserRole = 'ADMIN';

    for(let i = 0; i < 4; i++)
      service.users.push(new User({"_id" : "58e31be4d7f7ba00119171d1", "location" : null, "online" : true, "status_information" : null, "status" : 0, "role" : "CITIZEN", "updated_at" : "1491278820791", "created_at" : "1491278820791", "password" : "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "email" : null, "username" : "TEST", "__v" : 0}));

    service.searchTerm = 'TEST';

    service.updateSearch();
    service.clearStatusSelection();
    expect(service.filteredUsers.length).toBeGreaterThan(0);
  }));

});
