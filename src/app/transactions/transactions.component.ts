import { Component, OnInit, Input } from '@angular/core';
import { SortEvent } from 'primeng/api';

import { Transaction } from '@app/transactions/Transaction';
import { TransactionsService } from '@app/services/transactions.service';
import { LocationsModalComponent } from '@app/shared/locations-modal/locations-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-transactions',
    templateUrl: './transactions.component.html',
})
export class TransactionsComponent implements OnInit {
    @Input() account: number;
    transactions: Transaction[] = [];
    cols: any[];

    constructor(private transactionsService: TransactionsService, private modalService: NgbModal) {}

    openModal() {
        this.modalService.open(LocationsModalComponent, { size: 'lg' });
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
}

