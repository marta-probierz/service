import { Component, OnInit, Input } from '@angular/core';

import { Transaction } from '@app/transactions/Transaction';
import { TransactionsService } from '@app/services/transactions.service';
import { Location } from '@app/transactions/Location';
import { LocationsService } from '@app/services/locations.service';

@Component({
    selector: 'app-transactions',
    templateUrl: './transactions.component.html',
})
export class TransactionsComponent implements OnInit {
    @Input() account: number;
    transactions: Transaction[] = [];
    cols: any[];
    locations: Location[] = [];
    locationsCols: any[];
    constructor(private transactionsService: TransactionsService, private locationsService: LocationsService ) {}

    ngOnInit(): void {
        this.transactionsService.getTransactions().subscribe((transactions: Transaction[]) => (this.transactions = transactions));

        this.cols = [
            { field: 'jobID', header: 'Job ID', icon: false },
            { field: 'location', header: 'Location', icon: true },
            { field: 'account', header: 'Account', icon: false },
            { field: 'billToAcct', header: 'Bill to ACCT', icon: false },
            { field: 'pendingAmountDue', header: 'Pending Amount DUE', icon: false },
            { field: 'lastActivityDate', header: 'Last Activity Date', icon: false }
        ];
        this.locationsService.getLocations().subscribe((locations: Location[]) => (this.locations = locations));
        this.locationsCols = [
            { field: 'acronym', header: 'Acronym', width: '20%' },
            { field: 'name', header: 'Name', width: '45%' },
            { field: 'location', header: 'Location', width: '35%' }
        ];
    }
}

