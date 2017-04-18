import { Injectable } from '@angular/core';
import { EmergencySupply } from '../../models/emergencySupply.model';

@Injectable()
export class SearchEmergencySupplyService {

  emergencySupplies: EmergencySupply[] = [];
  private filteredEmergencySupplies: EmergencySupply[] = [];
  displayedEmergencySupplies: EmergencySupply[] = [];

  searchTerm = '';
  showMoreEmergencySupplies = false;

  currentLoggedInUser = '';

  constructor() { }

  reset = () => {
    this.emergencySupplies = [];
    this.filteredEmergencySupplies = [];
    this.displayedEmergencySupplies = [];
    this.searchTerm = '';
    this.showMoreEmergencySupplies = false;
  };

  updateSearch = () => {
    console.log(this.emergencySupplies);
    this.filteredEmergencySupplies = this.emergencySupplies
      .filter(supply => supply.supplier.userId !== this.currentLoggedInUser)
      .filter(supply => this.searchTerm.trim().length === 0 || supply.supplyname.includes(this.searchTerm.trim()));

    this.displayedEmergencySupplies = this.filteredEmergencySupplies;
  }

}
