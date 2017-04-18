import { Injectable } from '@angular/core';
import { EmergencySupply } from '../../models/emergencySupply.model';

@Injectable()
export class SearchEmergencySupplyService {

  emergencySupplies: EmergencySupply[] = [];
  private filteredEmergencySupplies: EmergencySupply[] = [];
  displayedEmergencySupplies: EmergencySupply[] = [];

  searchTerm = '';
  showMoreEmergencySupplies = false;

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
      .filter(supply => this.searchTerm.trim().length === 0 || supply.supplyname.includes(this.searchTerm.trim()));

    this.displayedEmergencySupplies = this.filteredEmergencySupplies;
    //
    //
    // if (this.filteredEmergencySupplies.length > 10) {
    //   this.displayedEmergencySupplies = this.filteredEmergencySupplies.slice(0, 10);
    //   this.showMoreEmergencySupplies = true;
    // } else {
    //   this.displayedEmergencySupplies = this.filteredEmergencySupplies;
    //   this.showMoreEmergencySupplies = false;
    // }
    // console.log(this.displayedEmergencySupplies);
  };

  // loadMoreEmergencySuppliesButtonClicked = () => {
  //   if (this.displayedEmergencySupplies.length + 10 < this.filteredEmergencySupplies.length) {
  //     this.displayedEmergencySupplies = this.filteredEmergencySupplies.slice(0, this.displayedEmergencySupplies.length + 10)
  //   } else {
  //     this.displayedEmergencySupplies = this.filteredEmergencySupplies;
  //     this.showMoreEmergencySupplies = false;
  //   }
  // };

}
