import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(private locationsService: LocationsService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.locationsService.getLocations().subscribe((locations: Location[]) => (this.locations = locations));
    this.locationsCols = [
      { field: 'acronym', header: 'Acronym', width: '20%' },
      { field: 'name', header: 'Name', width: '45%' },
      { field: 'location', header: 'Location', width: '35%' }
    ];
  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
