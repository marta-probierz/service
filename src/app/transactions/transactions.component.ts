import { Component, OnInit, Input } from '@angular/core';

import { Transactions } from '@app/transactions/Transactions';
import { TransactionsService } from '@app/services/transactions.service';

@Component({
    selector: 'app-transactions',
    templateUrl: './transactions.component.html',
})
export class TransactionsComponent implements OnInit {
    @Input() account: number;
    transactions: Transactions[] = [];
    cols: any[];
    constructor(private transactionsService: TransactionsService) {}

    ngOnInit(): void {
        this.transactionsService.getTransactions().subscribe((transactions: Transactions[]) => (this.transactions = transactions));

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

