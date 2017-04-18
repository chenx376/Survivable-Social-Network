import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { SearchEmergencySupplyService } from './search-emergency-supply.service';
import { EmergencySupply } from "../../models/emergencySupply.model";

describe('SearchEmergencySupplyServiceTest', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SearchEmergencySupplyService,
          deps: [],
           useFactory:
             () => {
               let service = new SearchEmergencySupplyService();
               service.emergencySupplies = //ADD 15 ANNOUNCEMENTS
                 [
                   new EmergencySupply({"supplier": {"id": "RANDOM_ID"},"supplyId": "58e33a3478a1620011fd830d", "supplyname": "Emergency Supply Test", "location_text": "2326 California Street, Mountain View, California", "location_lat" : "1.316552", "location_lng" : "103.909327", "type" : "Medicine"}),
                   new EmergencySupply({"supplier": {"id": "RANDOM_ID"},"supplyId": "58e33a3478a1620011fd830d", "supplyname": "Emergency Supply Test", "location_text": "2326 California Street, Mountain View, California", "location_lat" : "1.316552", "location_lng" : "103.909327", "type" : "Medicine"}),
                   new EmergencySupply({"supplier": {"id": "RANDOM_ID"},"supplyId": "58e33a3478a1620011fd830d", "supplyname": "Emergency Supply Test", "location_text": "2326 California Street, Mountain View, California", "location_lat" : "1.316552", "location_lng" : "103.909327", "type" : "Medicine"}),
                   new EmergencySupply({"supplier": {"id": "RANDOM_ID"},"supplyId": "58e33a3478a1620011fd830d", "supplyname": "Emergency Supply Test", "location_text": "2326 California Street, Mountain View, California", "location_lat" : "1.316552", "location_lng" : "103.909327", "type" : "Medicine"}),
                   new EmergencySupply({"supplier": {"id": "RANDOM_ID"},"supplyId": "58e33a3478a1620011fd830d", "supplyname": "Emergency Supply Test", "location_text": "2326 California Street, Mountain View, California", "location_lat" : "1.316552", "location_lng" : "103.909327", "type" : "Medicine"}),
                   new EmergencySupply({"supplier": {"id": "RANDOM_ID"},"supplyId": "58e33a3478a1620011fd830d", "supplyname": "Emergency Supply Test", "location_text": "2326 California Street, Mountain View, California", "location_lat" : "1.316552", "location_lng" : "103.909327", "type" : "Medicine"}),
                   new EmergencySupply({"supplier": {"id": "RANDOM_ID"},"supplyId": "58e33a3478a1620011fd830d", "supplyname": "Emergency Supply Test", "location_text": "2326 California Street, Mountain View, California", "location_lat" : "1.316552", "location_lng" : "103.909327", "type" : "Medicine"}),
                   new EmergencySupply({"supplier": {"id": "RANDOM_ID"},"supplyId": "58e33a3478a1620011fd830d", "supplyname": "Emergency Supply Test", "location_text": "2326 California Street, Mountain View, California", "location_lat" : "1.316552", "location_lng" : "103.909327", "type" : "Medicine"}),
                   new EmergencySupply({"supplier": {"id": "RANDOM_ID"},"supplyId": "58e33a3478a1620011fd830d", "supplyname": "Emergency Supply Test", "location_text": "2326 California Street, Mountain View, California", "location_lat" : "1.316552", "location_lng" : "103.909327", "type" : "Medicine"}),
                   new EmergencySupply({"supplier": {"id": "RANDOM_ID"},"supplyId": "58e33a3478a1620011fd830d", "supplyname": "Emergency Supply Test", "location_text": "2326 California Street, Mountain View, California", "location_lat" : "1.316552", "location_lng" : "103.909327", "type" : "Medicine"}),
                   new EmergencySupply({"supplier": {"id": "RANDOM_ID"},"supplyId": "58e33a3478a1620011fd830d", "supplyname": "Emergency Supply Test", "location_text": "2326 California Street, Mountain View, California", "location_lat" : "1.316552", "location_lng" : "103.909327", "type" : "Medicine"}),
                   new EmergencySupply({"supplier": {"id": "RANDOM_ID"},"supplyId": "58e33a3478a1620011fd830d", "supplyname": "Emergency Supply Test", "location_text": "2326 California Street, Mountain View, California", "location_lat" : "1.316552", "location_lng" : "103.909327", "type" : "Medicine"}),
                   new EmergencySupply({"supplier": {"id": "RANDOM_ID"},"supplyId": "58e33a3478a1620011fd830d", "supplyname": "Emergency Supply Test", "location_text": "2326 California Street, Mountain View, California", "location_lat" : "1.316552", "location_lng" : "103.909327", "type" : "Medicine"}),
                   new EmergencySupply({"supplier": {"id": "RANDOM_ID"},"supplyId": "58e33a3478a1620011fd830d", "supplyname": "Emergency Supply Test", "location_text": "2326 California Street, Mountain View, California", "location_lat" : "1.316552", "location_lng" : "103.909327", "type" : "Medicine"}),
                   new EmergencySupply({"supplier": {"id": "RANDOM_ID"},"supplyId": "58e33a3478a1620011fd830d", "supplyname": "Emergency Supply Test", "location_text": "2326 California Street, Mountain View, California", "location_lat" : "1.316552", "location_lng" : "103.909327", "type" : "Medicine"}),
                 ];

               return service;
             }
        }
      ]
    });
    TestBed.compileComponents();
  });

  it('should Create the service', inject([SearchEmergencySupplyService], (service: SearchEmergencySupplyService) => {
    service = getTestBed().get(SearchEmergencySupplyService);
    expect(service).not.toBeNull();
  }));

  it('should simulate retrieving emergencySupplies', inject([SearchEmergencySupplyService], (service: SearchEmergencySupplyService) => {
    service = getTestBed().get(SearchEmergencySupplyService);
    expect(service.emergencySupplies).not.toBeNull();
  }));

  it('should clear emergencySupplies', inject([SearchEmergencySupplyService], (service: SearchEmergencySupplyService) => {
    service = getTestBed().get(SearchEmergencySupplyService);
    service.reset();
    expect(service.displayedEmergencySupplies.length).toBe(0);
  }));

  it('should search 5 elements', inject([SearchEmergencySupplyService], (service: SearchEmergencySupplyService) => {
    service = getTestBed().get(SearchEmergencySupplyService);

    service.emergencySupplies.push(new EmergencySupply({"supplier": {"id": "RANDOM_ID"},"supplyId": "58e33a3478a1620011fd830d", "supplyname": "NEW Emergency Supply Test", "location_text": "2326 California Street, Mountain View, California", "location_lat" : "1.316552", "location_lng" : "103.909327", "type" : "Medicine"}));
    service.emergencySupplies.push(new EmergencySupply({"supplier": {"id": "RANDOM_ID"},"supplyId": "58e33a3478a1620011fd830d", "supplyname": "NEW Emergency Supply Test", "location_text": "2326 California Street, Mountain View, California", "location_lat" : "1.316552", "location_lng" : "103.909327", "type" : "Medicine"}));
    service.emergencySupplies.push(new EmergencySupply({"supplier": {"id": "RANDOM_ID"},"supplyId": "58e33a3478a1620011fd830d", "supplyname": "NEW Emergency Supply Test", "location_text": "2326 California Street, Mountain View, California", "location_lat" : "1.316552", "location_lng" : "103.909327", "type" : "Medicine"}));
    service.emergencySupplies.push(new EmergencySupply({"supplier": {"id": "RANDOM_ID"},"supplyId": "58e33a3478a1620011fd830d", "supplyname": "NEW Emergency Supply Test", "location_text": "2326 California Street, Mountain View, California", "location_lat" : "1.316552", "location_lng" : "103.909327", "type" : "Medicine"}));
    service.emergencySupplies.push(new EmergencySupply({"supplier": {"id": "RANDOM_ID"},"supplyId": "58e33a3478a1620011fd830d", "supplyname": "NEW Emergency Supply Test", "location_text": "2326 California Street, Mountain View, California", "location_lat" : "1.316552", "location_lng" : "103.909327", "type" : "Medicine"}));
    service.emergencySupplies.push(new EmergencySupply({"supplier": {"id": "RANDOM_ID"},"supplyId": "58e33a3478a1620011fd830d", "supplyname": "Emergency Supply Test", "location_text": "2326 California Street, Mountain View, California", "location_lat" : "1.316552", "location_lng" : "103.909327", "type" : "Medicine"}));
    service.emergencySupplies.push(new EmergencySupply({"supplier": {"id": "RANDOM_ID"},"supplyId": "58e33a3478a1620011fd830d", "supplyname": "Emergency Supply Test", "location_text": "2326 California Street, Mountain View, California", "location_lat" : "1.316552", "location_lng" : "103.909327", "type" : "Medicine"}));
    service.emergencySupplies.push(new EmergencySupply({"supplier": {"id": "RANDOM_ID"},"supplyId": "58e33a3478a1620011fd830d", "supplyname": "Emergency Supply Test", "location_text": "2326 California Street, Mountain View, California", "location_lat" : "1.316552", "location_lng" : "103.909327", "type" : "Medicine"}));
    service.emergencySupplies.push(new EmergencySupply({"supplier": {"id": "RANDOM_ID"},"supplyId": "58e33a3478a1620011fd830d", "supplyname": "Emergency Supply Test", "location_text": "2326 California Street, Mountain View, California", "location_lat" : "1.316552", "location_lng" : "103.909327", "type" : "Medicine"}));
    service.emergencySupplies.push(new EmergencySupply({"supplier": {"id": "RANDOM_ID"},"supplyId": "58e33a3478a1620011fd830d", "supplyname": "Emergency Supply Test", "location_text": "2326 California Street, Mountain View, California", "location_lat" : "1.316552", "location_lng" : "103.909327", "type" : "Medicine"}));
    service.emergencySupplies.push(new EmergencySupply({"supplier": {"id": "RANDOM_ID"},"supplyId": "58e33a3478a1620011fd830d", "supplyname": "Emergency Supply Test", "location_text": "2326 California Street, Mountain View, California", "location_lat" : "1.316552", "location_lng" : "103.909327", "type" : "Medicine"}));
    service.emergencySupplies.push(new EmergencySupply({"supplier": {"id": "RANDOM_ID"},"supplyId": "58e33a3478a1620011fd830d", "supplyname": "Emergency Supply Test", "location_text": "2326 California Street, Mountain View, California", "location_lat" : "1.316552", "location_lng" : "103.909327", "type" : "Medicine"}));
    service.emergencySupplies.push(new EmergencySupply({"supplier": {"id": "RANDOM_ID"},"supplyId": "58e33a3478a1620011fd830d", "supplyname": "Emergency Supply Test", "location_text": "2326 California Street, Mountain View, California", "location_lat" : "1.316552", "location_lng" : "103.909327", "type" : "Medicine"}));
    service.emergencySupplies.push(new EmergencySupply({"supplier": {"id": "RANDOM_ID"},"supplyId": "58e33a3478a1620011fd830d", "supplyname": "Emergency Supply Test", "location_text": "2326 California Street, Mountain View, California", "location_lat" : "1.316552", "location_lng" : "103.909327", "type" : "Medicine"}));
    service.emergencySupplies.push(new EmergencySupply({"supplier": {"id": "RANDOM_ID"},"supplyId": "58e33a3478a1620011fd830d", "supplyname": "Emergency Supply Test", "location_text": "2326 California Street, Mountain View, California", "location_lat" : "1.316552", "location_lng" : "103.909327", "type" : "Medicine"}));
    service.emergencySupplies.push(new EmergencySupply({"supplier": {"id": "RANDOM_ID"},"supplyId": "58e33a3478a1620011fd830d", "supplyname": "Emergency Supply Test", "location_text": "2326 California Street, Mountain View, California", "location_lat" : "1.316552", "location_lng" : "103.909327", "type" : "Medicine"}));


    service.updateSearch();
    service.searchTerm = 'NEW';
    service.updateSearch();
    expect(service.displayedEmergencySupplies.length).toBe(5);
  }));

  it('should handle EMPTY SEARCH', inject([SearchEmergencySupplyService], (service: SearchEmergencySupplyService) => {
    service = getTestBed().get(SearchEmergencySupplyService);

    service.emergencySupplies.push(new EmergencySupply({"supplier": {"id": "RANDOM_ID"},"supplyId": "58e33a3478a1620011fd830d", "supplyname": "Emergency Supply Test", "location_text": "2326 California Street, Mountain View, California", "location_lat" : "1.316552", "location_lng" : "103.909327", "type" : "Medicine"}));
    service.emergencySupplies.push(new EmergencySupply({"supplier": {"id": "RANDOM_ID"},"supplyId": "58e33a3478a1620011fd830d", "supplyname": "Emergency Supply Test", "location_text": "2326 California Street, Mountain View, California", "location_lat" : "1.316552", "location_lng" : "103.909327", "type" : "Medicine"}));
    service.emergencySupplies.push(new EmergencySupply({"supplier": {"id": "RANDOM_ID"},"supplyId": "58e33a3478a1620011fd830d", "supplyname": "Emergency Supply Test", "location_text": "2326 California Street, Mountain View, California", "location_lat" : "1.316552", "location_lng" : "103.909327", "type" : "Medicine"}));
    service.emergencySupplies.push(new EmergencySupply({"supplier": {"id": "RANDOM_ID"},"supplyId": "58e33a3478a1620011fd830d", "supplyname": "Emergency Supply Test", "location_text": "2326 California Street, Mountain View, California", "location_lat" : "1.316552", "location_lng" : "103.909327", "type" : "Medicine"}));
    service.emergencySupplies.push(new EmergencySupply({"supplier": {"id": "RANDOM_ID"},"supplyId": "58e33a3478a1620011fd830d", "supplyname": "Emergency Supply Test", "location_text": "2326 California Street, Mountain View, California", "location_lat" : "1.316552", "location_lng" : "103.909327", "type" : "Medicine"}));
    service.emergencySupplies.push(new EmergencySupply({"supplier": {"id": "RANDOM_ID"},"supplyId": "58e33a3478a1620011fd830d", "supplyname": "Emergency Supply Test", "location_text": "2326 California Street, Mountain View, California", "location_lat" : "1.316552", "location_lng" : "103.909327", "type" : "Medicine"}));
    service.emergencySupplies.push(new EmergencySupply({"supplier": {"id": "RANDOM_ID"},"supplyId": "58e33a3478a1620011fd830d", "supplyname": "Emergency Supply Test", "location_text": "2326 California Street, Mountain View, California", "location_lat" : "1.316552", "location_lng" : "103.909327", "type" : "Medicine"}));
    service.emergencySupplies.push(new EmergencySupply({"supplier": {"id": "RANDOM_ID"},"supplyId": "58e33a3478a1620011fd830d", "supplyname": "Emergency Supply Test", "location_text": "2326 California Street, Mountain View, California", "location_lat" : "1.316552", "location_lng" : "103.909327", "type" : "Medicine"}));
    service.emergencySupplies.push(new EmergencySupply({"supplier": {"id": "RANDOM_ID"},"supplyId": "58e33a3478a1620011fd830d", "supplyname": "Emergency Supply Test", "location_text": "2326 California Street, Mountain View, California", "location_lat" : "1.316552", "location_lng" : "103.909327", "type" : "Medicine"}));
    service.emergencySupplies.push(new EmergencySupply({"supplier": {"id": "RANDOM_ID"},"supplyId": "58e33a3478a1620011fd830d", "supplyname": "Emergency Supply Test", "location_text": "2326 California Street, Mountain View, California", "location_lat" : "1.316552", "location_lng" : "103.909327", "type" : "Medicine"}));

    service.updateSearch();
    service.searchTerm = '';
    service.updateSearch();
    expect(service.displayedEmergencySupplies.length).toBe(25);
  }));

});
