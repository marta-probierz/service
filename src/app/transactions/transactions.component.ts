import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';

import { Transaction } from '@app/transactions/Transaction';
import { TransactionsService } from '@app/services/transactions.service';
import { LocationsModalComponent } from '@app/shared/locations-modal/locations-modal.component';

@Component({
    selector: 'app-transactions',
    templateUrl: './transactions.component.html',
})
export class TransactionsComponent implements OnInit, AfterViewInit {
    @Input() account: number;
    transactions: Transaction[] = [];
    cols: any[];
    @ViewChild(LocationsModalComponent) child;
    open;
    constructor(private transactionsService: TransactionsService) {}

    ngAfterViewInit() {
        this.open = this.child.open;
    }

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
    }
}

