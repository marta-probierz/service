import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { LocationsService } from '@app/services/locations.service';
import { Location } from '@app/shared/locations-modal/Location';

@Component({
  selector: 'app-locations-modal',
  templateUrl: './locations-modal.component.html',
})

export class LocationsModalComponent implements OnInit {
  closeResult = '';
  locations: Location[] = [];
  locationsCols: any[];

  constructor(private locationsService: LocationsService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.locationsService.getLocations().subscribe((locations: Location[]) => (this.locations = locations));
    this.locationsCols = [
      { field: 'acronym', header: 'Acronym', width: '20%' },
      { field: 'name', header: 'Name', width: '45%' },
      { field: 'location', header: 'Location', width: '35%' }
    ];
  }
}
