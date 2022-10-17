import { Component, OnInit } from '@angular/core';
import { SortEvent } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

import { Transaction } from '@app/transactions/Transaction';
import { LocationsModalComponent } from '@app/shared/locations-modal/locations-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-pending-transactions',
  templateUrl: './pending-transactions.component.html',
})
export class PendingTransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  cols: any[];
  locationsPen: string[];

  constructor(private modalService: NgbModal, public activatedRoute: ActivatedRoute) { }

  openModal() {
    this.modalService.open(LocationsModalComponent, { size: 'lg' });
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(value => {
      this.transactions = value.transactions;
      this.locationsPen = [...new Set(this.transactions.map(i => i.location))];
    });

    this.cols = [
      { field: 'jobID', header: 'Job ID', icon: false },
      { field: 'location', header: 'Location', icon: true },
      { field: 'account', header: 'Account', icon: false },
      { field: 'billToAcct', header: 'Bill to ACCT', icon: false },
      { field: 'pendingAmountDue', header: 'Pending Amount DUE', icon: false },
      { field: 'lastActivityDate', header: 'Last Activity Date', icon: false }
    ];
  }

  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
      const value1 = data1[event.field];
      const value2 = data2[event.field];
      let result = null;
      if (value1 == null && value2 != null) { result = -1; }
      else if (value1 != null && value2 == null) { result = 1; }
      else if (value1 == null && value2 == null) { result = 0; }
      else if (typeof value1 === 'string' && typeof value2 === 'string') { result = value1.localeCompare(value2); }
      else { result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0; }

      return (event.order * result);
    });
  }

  filterLocationPen(location, table) {
    this.transactions.filter(i => {
      if (i.location === location) {
        table.filterGlobal(location, 'equals');
      } else if (location === '') {
        table.filterGlobal(location, 'not-equals');
      }
    });
  }
}
